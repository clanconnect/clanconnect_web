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
  zapFeatures
}) => {

  const [showPlanMobile, setShowPlanMobile] = useState(false);

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
                    ₹{subscription_plan.net_amount}
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
                      ₹{subscription_plan.subscription_amount}
                    </span>
                    <span style={{ fontSize: "26px", fontWeight: 600 }}>
                      &nbsp; ₹{subscription_plan.amount}
                    </span>
                    <span className="discount">
                      &nbsp; SAVE {subscription_plan.discount}%
                    </span>
                    <span className="amount-per-month ms-auto">
                      ₹{subscription_plan.monthly_amount}/month
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

            <ul>
              {features.map((feature, index) => {
                console.log(feature, "feature");
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
          </>
        )}
      </div>
    </div>
  );
};

export default PricingPlanInfluencer;