'use client';
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

import { SubscriptionPlanFeaturesData  } from '../../../data/data';
import { Link } from "@/lib/router";


const PricingPlanInfluencer = ({
  availablePlan,
  subscription_plan,
  makePayment,
  loading,
  account_type,
  activePlan,
  zapFeatures,
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

  let cta;
  
  let features;
  if (subscription_plan.plan_name === "BASIC") {
    cta = {
      btn_name: "Start Free",
      href_url: "https://www.app.clanconnect.ai/login",
    };
    features =
      subscription_plan.user_type === "Influencer"
        ? SubscriptionPlanFeaturesData.influencer.basic_plan_features
        : SubscriptionPlanFeaturesData.brand.basic_plan_features;
  } else {
    cta = {
      btn_name: "Subscribe",
      href_url: "https://www.app.clanconnect.ai/login",
    };
    features =
      subscription_plan.user_type === "Influencer"
        ? SubscriptionPlanFeaturesData.influencer.premium_plan_features
        : SubscriptionPlanFeaturesData.brand.premium_plan_features;
  }

  if (subscription_plan.plan_name?.toLowerCase() === "basic") {
    features = ["Influencer", "Talent Partner"].includes(subscription_plan.user_type)
      ? SubscriptionPlanFeaturesData.influencer.basic_plan_features
      : SubscriptionPlanFeaturesData.brand.basic_plan_features;
  } else {
    features = ["Influencer", "Talent Partner"].includes(subscription_plan.user_type)
      ? SubscriptionPlanFeaturesData.influencer.premium_plan_features
      : SubscriptionPlanFeaturesData.brand.premium_plan_features;
  }

  let zapFeaturesPlan = [];

  if (subscription_plan.plan_name?.toLowerCase() === "basic") {
    zapFeaturesPlan = zapFeatures?.influencer?.basic_plan_feature_text || [];
  } 
  else if (subscription_plan.plan_name?.toLowerCase() === "starter") {
    zapFeaturesPlan = zapFeatures?.influencer?.starter_plan_feature_text || [];
  } 
  else {
    zapFeaturesPlan = zapFeatures?.influencer?.savings_plan_feature_text || [];
  }

  

  console.log(zapFeatures, "zapFeatures.");

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
              {subscription_plan.plan_name === "BASIC"
                ? "BASIC"
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
            <span className="ps-2 fs-12 ms-auto">(Billed Monthly)</span>
          </span>
          {subscription_plan.plan_name === "BASIC" && (
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

          {subscription_plan.plan_name !== "BASIC" &&
            subscription_plan.discount === 0 && (
              <>
                <span className="brand-pricing-plan-type">
                  <span className="pricing-span">
                    {sym}{price("amount")}
                  </span>
                </span>
              </>
            )}

          {subscription_plan.plan_name !== "BASIC" &&
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

          {subscription_plan.description && (
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
            <section className="zap-section">
              <ul>
                {zapFeaturesPlan?.map((feature, index) => (
                  <li key={index} className={feature.liClassName}>
                    {feature?.iconClassName && (
                      <i className={feature.iconClassName}></i>
                    )}
                    {feature?.text}
                  </li>
                ))}
              </ul>
            </section>

            {!isForeign && (
              <ul>
                {features.map((feature, index) => {
                  const isBasic = subscription_plan.plan_name === "BASIC";

                  let iconClass = feature.iconClassName;

                  if (isBasic) {
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