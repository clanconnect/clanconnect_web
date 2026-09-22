'use client';
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

import { SubscriptionPlanFeaturesData  } from '../../../data/data';
import { Link } from "@/lib/router";
// Imported from the module directly, not the core/utility barrel: that barrel
// also re-exports numbers.ts, whose 'number-to-words' dependency is not
// installed and would fail the build.
import { zapPlanFeatures, zapPlanHeading } from "@/core/utility/zapPlanFeatures";


const PricingPlanInfluencer = ({
  availablePlan,
  subscription_plan,
  makePayment,
  loading,
  account_type,
  activePlan,
  isForeign: isForeignPage,
}) => {

  const [showPlanMobile, setShowPlanMobile] = useState(false);

  // Currency: backend adds currency_symbol + display_<field> (USD outside India,
  // INR passthrough otherwise). Fall back to raw INR fields when absent.
  const sym = subscription_plan.currency_symbol || "₹";
  const price = (field) =>
    subscription_plan[`display_${field}`] ?? subscription_plan[field];

  // Foreign (non-India) visitors: hide every non-Zap section (India-specific
  // campaign, analytics and GST-invoicing features) and show only the ZAP one.
  // The page-level flag is the authority — the BASIC card comes from hardcoded
  // data with no currency_symbol, so its own row can never reveal this. The
  // symbol check stays as a per-row fallback for a plan priced in USD.
  const isForeign = isForeignPage || sym !== "₹";

  const planTypeMap = {
    Monthly: "Monthly",
    Annually: "Annually",
    "Annual Plan": "Annually",
    "Half-Yearly": "Half-Yearly",
    Quarterly: "Quarterly"
  };

  // The free card is 'BASIC' in the hardcoded fallback data and 'FOC' in the
  // API rows — same card, so every check below goes through this flag.
  const planName = subscription_plan.plan_name || "";
  const isBasicPlan = ["basic", "foc"].includes(planName.toLowerCase());
  // The 7-day trial is an ordinary plan row (amount 0, days 7). It is priced as
  // "Free for N days" rather than through the generic ₹0 price block.
  const isTrialPlan = planName.toLowerCase() === "trial";
  const trialDays = Number(subscription_plan.days) || 7;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("plan_type") === "half-yearly") {
      setShowPlanMobile(false);

      const button = document.getElementById("half-yearly-plan-infl");
      if (button) button.click();
    }
  }, []);

  const handleMobilePlanVisible = () => {
    if (
      subscription_plan.user_type === "Brand" ||
      subscription_plan.user_type === "Agency"
    ) {
      setShowPlanMobile(!showPlanMobile);
    }
  };

  // CTA. The trial is claimed inside the app (it needs a logged-in influencer to
  // check eligibility), so every card here just routes to login.
  const cta = isBasicPlan
    ? { btn_name: "Start Free", href_url: "https://www.app.clanconnect.ai/login" }
    : isTrialPlan
      ? { btn_name: "Start Free Trial", href_url: "https://www.app.clanconnect.ai/login" }
      : { btn_name: "Subscribe", href_url: "https://www.app.clanconnect.ai/login" };

  // Non-Zap (marketplace) features. The trial unlocks everything, so it reads
  // the premium list like the paid plans do.
  const isInfluencerCard = ["Influencer", "Talent Partner"].includes(
    subscription_plan.user_type
  );
  const featureSet = isInfluencerCard
    ? SubscriptionPlanFeaturesData.influencer
    : SubscriptionPlanFeaturesData.brand;
  const features = isBasicPlan
    ? featureSet.basic_plan_features
    : featureSet.premium_plan_features;

  // ---- ZAP feature list ----
  // Built from the plan's own `entitlements` (plan_entitlements rows, served
  // with the plan) rather than from a hardcoded list, so these numbers always
  // match what the in-app Settings > Subscription tab shows and a limit change
  // in the DB needs no web release. A row without entitlements renders no ZAP
  // section at all — better silence than stale numbers.
  const entitlements = subscription_plan.entitlements;

  // OLD: the whole list was assembled here, labelling each entitlement in the
  // data model's vocabulary ("rule per automation", "trigger keyword per rule",
  // "zap links per rule", "Ask to Follow & button messages") — the exact words
  // the simplified Zap wizard stopped using — and never mentioning Collect
  // leads at all. It now comes from zapPlanFeatures(), shared with the app and
  // the mobile Subscription screen so the three cannot drift.
  // A row without entitlements still renders no ZAP section: better silence
  // than stale numbers.
  const zapFeaturesPlan = !entitlements
    ? []
    : [
        {
          text: <strong>{zapPlanHeading(subscription_plan.plan_name)}</strong>,
          liClassName: "border-bottom-0",
          iconClassName: "",
        },
        ...zapPlanFeatures(entitlements, subscription_plan.plan_name).map((text) => ({
          text,
          iconClassName: "bi bi-check",
        })),
      ].map((feature) => ({ liClassName: "", ...feature }));

  return (
    <div
      className={`pricing-plan ${showPlanMobile ? "mobile-active" : ""} ${
        subscription_plan.plan_name === "Annually" ? "position-relative" : ""
      }`}
    >
      {subscription_plan.plan_name === "Annually" && (
        <div className="ribbon">
          <span>Super Saver</span>
        </div>
      )}

      <div className="pricing-plan-div ">
        <div className="d-flex flex-column pb-3">
          <span
            onClick={handleMobilePlanVisible}
            className="pricing-title d-flex align-items-center"
            id={
              subscription_plan.plan_name === "Half-Yearly"
                ? "half-yearly-plan-infl"
                : ""
            }
          >
            <span className="pricing-title">
              {isBasicPlan
                ? "BASIC"
                : isTrialPlan
                  ? "Free Trial"
                  : subscription_plan.plan_name === "Monthly"
                    ? "MONTHLY"
                    : subscription_plan.plan_name === "Quarterly"
                      ? "QUARTERLY"
                      : subscription_plan.plan_name === "Annually"
                        ? "ANNUALLY"
                        : subscription_plan.plan_name === "Starter"
                          ? "Starter"
                          : subscription_plan.plan_name === "Savings"
                            ? "Savings"
                            : "PREMIUM"}

              {(subscription_plan.user_type === "Brand" ||
                subscription_plan.user_type === "Agency") && (
                <i className="bi bi-chevron-down d-lg-none"></i>
              )}
            </span>
            <span className="ps-2 fs-12 ms-auto">
              {isTrialPlan
                ? "(No payment required)"
                : isBasicPlan
                  ? "(Billed Monthly)"
                  : `(Billed ${planTypeMap[subscription_plan.plan_type] || "Monthly"})`}
            </span>
          </span>
          {isBasicPlan && (
            <span className="d-flex flex-column">
              <span className="brand-pricing-plan-type">
                <span className="pricing-span">Free</span>
              </span>
              <span className="pricing-description">
                By default, this plan is activated until
                <br /> you purchase a premium plan
              </span>
            </span>
          )}

          {/* Trial: priced as "Free for N days", never as the generic ₹0 the
              amount-driven blocks below would print. */}
          {isTrialPlan && (
            <span className="d-flex flex-column">
              <span className="brand-pricing-plan-type">
                {/* Both parts sit inside .pricing-span so they stay on one line
                    (on desktop that span lays its contents out as a flex row). */}
                <span className="pricing-span">
                  Free
                  <span className="ps-2 fs-14">for {trialDays} days</span>
                </span>
              </span>
              <span className="pricing-description">
                Full access to every premium feature. No card needed — it simply
                <br /> ends after {trialDays} days.
              </span>
            </span>
          )}

          {!isBasicPlan &&
            !isTrialPlan &&
            subscription_plan.discount === 0 && (
              <>
                <span className="brand-pricing-plan-type">
                  <span className="pricing-span">
                    {sym}{price("amount")}
                  </span>
                </span>
              </>
            )}

          {!isBasicPlan &&
            !isTrialPlan &&
            subscription_plan.discount !== 0 && (
              <>
                <span className="brand-pricing-plan-type">
                  <span className="pricing-span">
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontWeight: "normal",
                        fontSize: "18px",
                      }}
                    >
                      {sym}{price("subscription_amount")}
                    </span>
                    <span style={{ fontSize: "26px", fontWeight: 600 }}>
                      &nbsp; {sym}{price("amount")}
                    </span>
                    <span className="discount">
                      &nbsp; SAVE {subscription_plan.discount}%
                    </span>
                    <span className="amount-per-month ms-auto">
                      {sym}{price("monthly_amount")}/month
                    </span>
                  </span>
                </span>
              </>
            )}

          {subscription_plan.description && !isTrialPlan && (
            <span className="pricing-description">
              {subscription_plan.description}
            </span>
          )}

          {subscription_plan.gst_included === "true" && (
            <span className="pricing-plan-gst">(inclusive of all taxes)</span>
          )}
        </div>

        {/* {subscription_plan.plan_name !== "BASIC" && (
          <LoadingButton
            className="btn btn-primary buy-btn plan-btn"
            loading={loading}
            loadingPosition="start"
            variant="contained"
            onClick={() => makePayment(subscription_plan)}
          >
            {activePlan !== null ? "Subscribe" : "Buy Now"}
          </LoadingButton>
        )} */}
        <Link
          className="btn btn-black w-blk-bg buy-btn plan-btn"
          to={cta.href_url}
        >
          {cta.btn_name}
        </Link>
      </div>

      <div className="pricing-plan-detail-sec">
        {(subscription_plan.user_type === "Influencer" ||
          subscription_plan.user_type === "Talent Partner") && (
          <>
            {zapFeaturesPlan.length > 0 && (
              <section className="zap-section">
                <ul>
                  {zapFeaturesPlan.map((feature, index) => (
                    <li key={index} className={feature.liClassName}>
                      {feature.iconClassName && (
                        <i className={feature.iconClassName}></i>
                      )}
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {!isForeign && (
              <ul>
                {features.map((feature, index) => {
                  let iconClass = feature.iconClassName;

                  if (isBasicPlan) {
                    if (index === 0) iconClass = "bi bi-check";
                    else iconClass = "bi bi-x";
                  }

                  return (
                    <li key={index}>
                      {iconClass && <i className={iconClass}></i>}
                      <span>{feature.text}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PricingPlanInfluencer;