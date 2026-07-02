'use client';
import React, { useState, useEffect } from "react";
import { Tab, Tabs, Nav } from "react-bootstrap";
import { Link } from "@/lib/router";
import { SubscriptionPlanData, SubscriptionPlanFeaturesData, ZAPFeaturesData } from "../../../data/data";
import { Helmet } from "@/lib/helmet";
import PricingPlanBrand from "./PricingPlan";
import PricingPlanInfluencer from "./PricingPlanInfluencer";

const Pricing = () => {
  const queryString = typeof window !== 'undefined' ? window.location.search : '';
  const urlParams = new URLSearchParams(queryString);
  
  const [influencerPlanType, setInfluencerPlanType] = useState("Half-Yearly");
  const [brandPlanType, setBrandPlanType] = useState("Monthly");

  const handleInfluencerPlanType = (tab) => {
    setInfluencerPlanType(tab);
  };

  const handleBrandPlanType = (tab) => {
    setBrandPlanType(tab);
  };

  useEffect(() => {
    if (urlParams.get("user_type") === 'influencer'){
      let button = document.getElementById('left-tabs-example-tab-second');
      if (button != null){
        button.click();
      }
    }
  }, []);


  console.log("influencerPlanType", influencerPlanType);
  console.log("SubscriptionPlanData", SubscriptionPlanData);

  return (
    <>
      <Helmet>
        <title>ClanConnect - Pricing</title>
        <link rel="canonical" href="https://www.clanconnect.ai/pricing" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content="https://www.clanconnect.ai/pricing" />
        <meta property="og:title" content="ClanConnect - Pricing" />
        <meta
          property="og:description"
          content="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers."
        />
        <meta
          property="og:image"
          content="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/faqs.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
      </Helmet>

      <main className="main-content-sec full-width pb-3 page-pricing">
        <div className="pricing-tab p-0">
          <div className="container">
            <div className="homeBanner homeBannerLatest inner news">
              <div className="container">
                <div className="banner-content">
                  <h1 className="banner-innerpage-heading">Pricing</h1>
                </div>
              </div>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <div className="subs-plan-sec main-tab">
                <Nav className="nav-tabs plan-info plan-info-main-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Brand</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Influencer</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>

              <Tab.Content>
                <Tab.Pane eventKey="first" className="plan-tab-brand">
                  <main className="full-width pb-3 page-pricing">
                    <div className="pricing-tab p-0">
                      <span className="plan-switch-btns">
                        <div className=" sidebar-nav mb-0">
                          {/* {Object.values(SubscriptionPlanData.brand).map(
                              (planData) =>
                                planData.plan_type !== "free" && (
                                  <span
                                    className={` sidebar-nav-link sml ${
                                      brandPlanType === planData.plan_type
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      handleBrandPlanType(planData.plan_type)
                                    }
                                  >
                                    {planData.plan_type}
                                  </span>
                                )
                            )} */}
                        </div>
                      </span>
                      <div className="tab-content" id="">
                        <div className="pricing-sec-infl">
                          <div className="pricing-sec-right">
                            <div className="pricing-plan-sec">
                              <div className="pricing-plan pricing-plan-info ">
                                <span
                                  className="pricing-title"
                                  style={{
                                    minHeight: "50px",
                                    backgroundColor: "transparent",
                                  }}
                                ></span>
                                <div className="pricing-plan-div">
                                  <div className="d-flex flex-column  pb-3 text-center">
                                    <span className="d-flex flex-column">
                                      <span className="brand-pricing-plan-type">
                                        <span
                                          className="pricing-span"
                                          style={{ opacity: "0" }}
                                        >
                                          {" "}
                                          ₹ 0/month
                                        </span>
                                      </span>
                                      <span
                                        className="pricing-plan-type pricing-span"
                                        style={{ opacity: "0" }}
                                      >
                                        Free
                                      </span>
                                      <span
                                        className="pricing-description"
                                        style={{ opacity: "0" }}
                                      >
                                        By default, this plan is activated until
                                        you purchase a premium plan
                                      </span>
                                    </span>
                                  </div>
                                  <Link
                                    style={{ minHeight: "50px" }}
                                    className="btn buy-btn plan-btn"
                                  ></Link>
                                </div>
                                <div className="pricing-plan-detail-sec">
                                  <ul>
                                    {SubscriptionPlanData.brand.basic_plan
                                      .user_type === "Brand" && (
                                      <>
                                        {SubscriptionPlanFeaturesData.brand.basic_plan_feature_text.map(
                                          (featureText) => {
                                            return <li>{featureText.text}</li>;
                                          },
                                        )}
                                      </>
                                    )}
                                  </ul>
                                </div>
                              </div>
                              <PricingPlanBrand
                                subscription_plan={
                                  SubscriptionPlanData.brand.basic_plan
                                }
                              />
                              <PricingPlanBrand
                                subscription_plan={
                                  SubscriptionPlanData.brand.Monthly
                                }
                              />
                              <PricingPlanBrand
                                subscription_plan={
                                  SubscriptionPlanData.brand.Quarterly
                                }
                              />
                              <PricingPlanBrand
                                subscription_plan={
                                  SubscriptionPlanData.brand.Annually
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="pt-2 plan-tab-influencer">
                  {/* <span>
                    📢 Important Update: Our <strong>half-yearly</strong> subscription plan will be discontinued from <strong>1st November, 2024</strong>. Grab it before it's gone!
                  </span> */}
                  <main className="full-width pb-3 page-pricing">
                    <div className="pricing-tab p-0">
                      <div className="tab-content" id="">
                        <div className="pricing-sec-infl pricing-plan-influencer">
                          <div className="pricing-sec-right">
                            <div className="pricing-plan-sec">
                              <div className="pricing-plan-inner">
                                {/* <div className="pricing-plan pricing-plan-info ">
                                <span
                                  className="pricing-title"
                                  style={{
                                    minHeight: "50px",
                                    backgroundColor: "transparent",
                                  }}
                                ></span>
                                <div className="pricing-plan-div">
                                  <div className="d-flex flex-column  pb-3 text-center">
                                    <span className="d-flex flex-column">
                                      <span className="brand-pricing-plan-type">
                                        <span
                                          className="pricing-span"
                                          style={{ opacity: "0" }}
                                        >
                                          {" "}
                                          ₹ 0/month
                                        </span>
                                      </span>
                                      <span
                                        className="pricing-plan-type pricing-span"
                                        style={{ opacity: "0" }}
                                      >
                                        Free
                                      </span>
                                      <span
                                        className="pricing-description"
                                        style={{ opacity: "0" }}
                                      >
                                        By default, this plan is activated until
                                        you purchase a premium plan
                                      </span>
                                    </span>
                                  </div>
                                  <Link
                                    style={{ minHeight: "50px" }}
                                    className="btn buy-btn plan-btn"
                                  ></Link>
                                </div>
                                {/* <div className="pricing-plan-detail-sec">
                                  <ul>
                                    {SubscriptionPlanData.influencer.basic_plan
                                      .user_type === "Influencer" && (
                                      <>
                                        {SubscriptionPlanFeaturesData.influencer.basic_plan_feature_text.map(
                                          (featureText) => {
                                            return <li>{featureText.text}</li>;
                                          },
                                        )}
                                      </>
                                    )}
                                  </ul>
                                </div> 
                              </div> */}
                                {Object.values(
                                  SubscriptionPlanData.influencer,
                                ).map((plan) => (
                                  <PricingPlanInfluencer
                                    key={plan.id}
                                    subscription_plan={plan}
                                    zapFeatures={ZAPFeaturesData}
                                  />
                                ))}
                              </div>
                              {/* <PricingPlan
                                subscription_plan={
                                  SubscriptionPlanData.influencer.basic_plan
                                }
                              /> */}
                              {/*  {Object.values(
                                  SubscriptionPlanData.influencer
                                ).map(
                                  (planData) =>
                                    planData.plan_type === influencerPlanType && (
                                      
                                    )
                                )}
                                */}
                              {/* <PricingPlan
                                subscription_plan={
                                  SubscriptionPlanData.influencer.Half_Yearly
                                }
                              />
                              <PricingPlan
                                subscription_plan={
                                  SubscriptionPlanData.influencer.Annually
                                }
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="fs-14 font-italic pb-5">
                      <strong>Please note:</strong> ClanConnect is an influencer
                      marketplace where we bring influencers and brands on a
                      common plane in the most transparent manner. The selection
                      of influencers for campaigns is the sole prerogative of
                      the brand and ClanConnect has no role in this. Also, it is
                      advisable to have a minimum of 1000 followers/subscribers
                      to apply for a campaign.
                    </p>
                  </main>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            <div className="text-center pb-5">
              <Link
                to="/our_business_models/1"
                className="btn btn-outline-black btn-sm"
              >
                View other business models
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Pricing;
