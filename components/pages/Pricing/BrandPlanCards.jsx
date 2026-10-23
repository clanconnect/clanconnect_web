'use client';
import React from "react";
import { Link } from "@/lib/router";
import { zapPlanFeatures, zapPlanHeading } from "@/core/utility/zapPlanFeatures";

// The Brand tab — the brand app's Subscription screen (clanconnect_mobile
// modules/brand/screens/settings/Subscription.tsx): a free Basic card and the
// API's Premium plans (the brand app sells one, Monthly), each with the same
// feature groups and the Zap section built from the plan's own entitlements.

const LOGIN_URL = "https://www.app.clanconnect.ai/login";

// The app's BASIC_FEATURES / PAID_FEATURES (same wording).
const BASIC_FEATURES = [
  {
    title: "Influencers",
    rows: [
      { label: "Search influencers", value: "25" },
      { label: "Profile reports", value: "100" },
      { label: "Download profile report", value: false },
      { label: "Create list of influencers", value: "3 lists, 10 each" },
      { label: "Compare (upto 15)", value: true },
    ],
  },
  {
    title: "Campaigns",
    rows: [
      { label: "Create a barter campaign brief", value: false },
      { label: "Create a paid campaign brief", value: "1" },
      { label: "Get unlimited proposals", value: "Till 7th day" },
      { label: "Negotiate influencers' quotation", value: "Till 14th day" },
      { label: "Create approval suite", value: "Till 30th day" },
    ],
  },
  {
    title: "Insights & Reporting",
    rows: [
      { label: "View campaign performance", value: "Till 40th day" },
      { label: "View individual influencer performance", value: true },
      { label: "View individual post performance", value: true },
      { label: "Download campaign report", value: false },
    ],
  },
  { title: "Clan Manager", rows: [{ label: "Dedicated Clan manager", value: false }] },
];

const PAID_FEATURES = [
  {
    title: "Influencers",
    rows: [
      { label: "Search influencers", value: "Unlimited" },
      { label: "Profile reports", value: "Unlimited" },
      { label: "Download profile report", value: "Unlimited" },
      { label: "Create list of influencers", value: "Unlimited" },
      { label: "Compare (upto 15)", value: "Unlimited" },
    ],
  },
  {
    title: "Campaigns",
    rows: [
      { label: "Create a barter campaign brief", value: "Unlimited" },
      { label: "Create a paid campaign brief", value: "Unlimited" },
      { label: "Get unlimited proposals", value: true },
      { label: "Negotiate influencers' quotation", value: true },
      { label: "Create approval suite", value: true },
    ],
  },
  {
    title: "Insights & Reporting",
    rows: [
      { label: "View campaign performance", value: true },
      { label: "View individual influencer performance", value: true },
      { label: "View individual post performance", value: true },
      { label: "Download campaign report", value: true },
    ],
  },
  { title: "Clan Manager", rows: [{ label: "Dedicated Clan manager", value: true }] },
];

const BILLING_LABEL = {
  Monthly: "Billed Monthly",
  Quarterly: "Billed Quarterly",
  "Half-Yearly": "Billed Half-Yearly",
  Annually: "Billed Annually",
};

const Check = () => (
  <svg className="brand-plan-card__yes" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Included" role="img">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Cross = () => (
  <svg className="brand-plan-card__no" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Not included" role="img">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ValueCell = ({ value }) =>
  value === true ? <Check /> : value === false ? <Cross /> : <span className="brand-plan-card__value">{value}</span>;

const FeatureSection = ({ group }) => (
  <div className="brand-plan-card__group">
    <p className="brand-plan-card__group-title">{group.title}</p>
    {group.rows.map((row, i) => (
      <div key={i} className="brand-plan-card__row">
        <span className="brand-plan-card__label">{row.label}</span>
        <ValueCell value={row.value} />
      </div>
    ))}
  </div>
);

/**
 * focPlan: the API's free (FOC) row — its entitlements are the Basic card's Zap
 * section. premiumPlans: the API's paid rows for the web.
 */
const BrandPlanCards = ({ focPlan, premiumPlans }) => {
  const cards = [
    { key: "basic", isBasic: true, plan_name: "Basic", entitlements: focPlan?.entitlements },
    ...(premiumPlans || []).map((p) => ({ ...p, key: p.plan_id || p.id || p.plan_name, isBasic: false })),
  ];

  return (
    <div className="brand-plan-cards">
      {cards.map((plan) => {
        const isBasic = plan.isBasic;
        // Local currency (outside India) when the API sends display_ fields.
        const sym = plan.currency_symbol || "₹";
        const price = (field) => Number(plan[`display_${field}`] ?? plan[field]);
        const money = (n) => `${sym}${Number(n).toLocaleString("en-IN")}`;
        const zapName = isBasic ? "Basic" : plan.plan_name;
        const zap = zapPlanFeatures(plan.entitlements, zapName);
        const strike = price("subscription_amount");
        const amount = price("amount");
        const monthly = price("monthly_amount");
        return (
          <article key={plan.key} className={`brand-plan-card${isBasic ? " brand-plan-card--basic" : ""}`}>
            <div className="brand-plan-card__top">
              <h3 className="brand-plan-card__name">{plan.plan_name}</h3>
              {!isBasic && Number(plan.discount) > 0 && <span className="brand-plan-card__save">SAVE {plan.discount}%</span>}
            </div>

            {isBasic ? (
              <>
                <p className="brand-plan-card__price">Free</p>
                <p className="brand-plan-card__note">By default, activated until you purchase a premium plan</p>
                <p className="brand-plan-card__note">Billed Monthly (Inclusive of Taxes)</p>
              </>
            ) : (
              <>
                <p className="brand-plan-card__price-row">
                  {!!strike && strike !== amount && <s className="brand-plan-card__strike">{money(strike)}</s>}
                  <span className="brand-plan-card__price">{money(amount)}</span>
                </p>
                {!!monthly && <p className="brand-plan-card__monthly">{money(monthly)}/month</p>}
                <p className="brand-plan-card__note">{BILLING_LABEL[plan.plan_type] || "Billed Monthly"} (Inclusive of Taxes)</p>
              </>
            )}

            <div className="brand-plan-card__divider" />

            <div className="brand-plan-card__features">
              {(isBasic ? BASIC_FEATURES : PAID_FEATURES).map((group) => (
                <FeatureSection key={group.title} group={group} />
              ))}
              {zap.length > 0 && (
                <FeatureSection group={{ title: zapPlanHeading(zapName), rows: zap.map((text) => ({ label: text, value: true })) }} />
              )}
            </div>

            <Link className="brand-plan-card__cta" to={LOGIN_URL}>
              {isBasic ? "Start Free" : "Buy Now"}
            </Link>
          </article>
        );
      })}
    </div>
  );
};

export default BrandPlanCards;
