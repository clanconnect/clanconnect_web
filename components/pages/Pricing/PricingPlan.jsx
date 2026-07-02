'use client';
import React, { useEffect, useState } from 'react';
import { Link } from '@/lib/router';
import { SubscriptionPlanFeaturesData } from '../../../data/data';

const PricingPlanBrand = ({ subscription_plan }) => {
  const queryString = typeof window !== 'undefined' ? window.location.search : '';
  const urlParams = new URLSearchParams(queryString);

  const [showPlanMobile, setShowPlanMobile] = useState(subscription_plan);

  useEffect(() => {
    if (urlParams.get("plan_type") === 'half-yearly'){
      setShowPlanMobile(false);

      let button = document.getElementById('half-yearly-plan-infl');
      if (button != null){
        button.click();
      }
    }
  }, []);

  const handleMobilePlanVisible = () => {
    if (subscription_plan.user_type === 'Brand' || subscription_plan.user_type === 'Agency'){
      if (subscription_plan.plan_name === 'Annually') {
        setShowPlanMobile(!showPlanMobile);
      } else {
        setShowPlanMobile(!showPlanMobile); // Close Annually if clicking on other plans
      }
    }else{
    }
  };
  let cta;
  let features;
  if (subscription_plan.plan_name === 'BASIC'){
    cta = {
      btn_name: 'Start Free',
      href_url: 'https://www.app.clanconnect.ai/login'
    }
    features = subscription_plan.user_type === 'Influencer' ? SubscriptionPlanFeaturesData.influencer.basic_plan_features : SubscriptionPlanFeaturesData.brand.basic_plan_features;
  }else{
    cta = {
      btn_name: 'Upgrade',
      href_url: 'https://www.app.clanconnect.ai/login'
    }
    features = subscription_plan.user_type === 'Influencer' ? SubscriptionPlanFeaturesData.influencer.premium_plan_features : SubscriptionPlanFeaturesData.brand.premium_plan_features;
  }
  return (
    <div
      className={`pricing-plan ${showPlanMobile ? "mobile-active" : ""} ${subscription_plan.plan_name === "Annually" ? "position-relative" : ""}`}
    >
      {subscription_plan.plan_name === "Annually" && (
        <div className="ribbon">
          <span>Super Saver</span>
        </div>
      )}
      <span
        onClick={handleMobilePlanVisible}
        className="pricing-title"
        id={`${subscription_plan.plan_name === "Half-Yearly" ? "half-yearly-plan-infl" : ""}`}
      >
        {subscription_plan.plan_name === "BASIC"
          ? "BASIC"
          : subscription_plan.plan_name === "Monthly"
            ? "MONTHLY"
            : subscription_plan.plan_name === "Quarterly"
              ? "QUARTERLY"
              : subscription_plan.plan_name === "Annually"
                ? subscription_plan.user_type === "Influencer"
                  ? "ANNUAL PLAN"
                  : "ANNUALLY"
                : subscription_plan.plan_name === "Half-Yearly"
                  ? "HALF YEARLY"
                  : "PREMIUM"}
        {(subscription_plan.user_type === "Brand" ||
          subscription_plan.user_type === "Agency") && (
          <i className="bi bi-chevron-down d-lg-none"></i>
        )}
      </span>
      <div className="pricing-plan-div" id="half-yearly-infl">
        <div className="d-flex flex-column  pb-3 text-center">
          {subscription_plan.plan_name === "BASIC" && (
            <span className="d-flex flex-column">
              <span className="brand-pricing-plan-type">
                <span className="pricing-span"> Free</span>
              </span>
              <span className="pricing-plan-type pricing-span"></span>
              <span className="pricing-description">
                By default, this plan is activated until you purchase a premium
                plan
              </span>
            </span>
          )}

          {subscription_plan.plan_name != "BASIC" &&
            subscription_plan.discount === 0 && (
              <>
                <span className="brand-pricing-plan-type">
                  <span className="pricing-span">
                    {" "}
                    ₹{subscription_plan.amount}
                  </span>
                </span>
                <span className="pricing-plan-type" style={{ opacity: "0" }}>
                  ₹{subscription_plan.amount}/{subscription_plan.plan_type}
                  <span className="discount">
                    {" "}
                    SAVE {subscription_plan.discount}%
                  </span>
                </span>
              </>
            )}
          {subscription_plan.plan_name != "BASIC" &&
            subscription_plan.discount != 0 && (
              <>
                <span className="d-flex flex-column">
                  <span className="brand-pricing-plan-type">
                    <span className="pricing-span">
                      <span style={{ textDecoration: "line-through" }}>
                        ₹ {subscription_plan.subscription_amount}
                      </span>
                      &nbsp; ₹{subscription_plan.net_amount}
                      &nbsp;
                      <span className="discount">
                        SAVE {subscription_plan.discount}%
                      </span>
                    </span>
                  </span>
                  <span className="pricing-plan-type">
                    <span
                      className="d-none"
                      style={{ textDecoration: "line-through" }}
                    >
                      ₹{subscription_plan.monthly_subscription_net_amount}
                    </span>
                    &nbsp; ₹{subscription_plan.monthly_net_amount}/month
                  </span>
                </span>
              </>
            )}
          {subscription_plan.description &&
            (subscription_plan.user_type === "Brand" ||
              subscription_plan.user_type === "Agency") && (
              <span className="pricing-description">
                {subscription_plan.description}
              </span>
            )}
          {subscription_plan.gst_included === "true" && (
            <span className="pricing-plan-gst">(inclusive of all taxes)</span>
          )}
        </div>

        <Link
          className="btn btn-black w-blk-bg buy-btn plan-btn"
          to={cta.href_url}
        >
          {cta.btn_name}
        </Link>
      </div>
      <div className="pricing-plan-detail-sec">
        {subscription_plan.user_type === "Influencer" && (
          <ul>
            {features.map((feature, index) => (
              <li key={index} className={feature.liClassName}>
                <span className="pricing-plan-mobile-text d-lg-none">
                  {feature.text}
                </span>
                {feature.iconClassName && (
                  <i className={feature.iconClassName} />
                )}
              </li>
            ))}
          </ul>
        )}
        {subscription_plan.user_type === "Brand" && (
          <ul>
            {features.map((feature, index) => (
              <li key={index} className={feature.liClassName}>
                <span className="d-lg-none pricing-plan-mobile-text">
                  {feature.text}
                </span>
                {feature.iconClassName && (
                  <i className={feature.iconClassName} />
                )}
                {feature.value && <span>{feature.value}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PricingPlanBrand;