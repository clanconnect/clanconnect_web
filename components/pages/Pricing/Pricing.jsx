'use client';
import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import { Link } from "@/lib/router";
import {
  SubscriptionPlanData,
  SubscriptionPlanFeaturesData,
} from "../../../data/data";
import { Helmet } from "@/lib/helmet";
import { SubscriptionService } from "@/core/services";
import PricingPlanBrand from "./PricingPlan";
import PricingPlanInfluencer from "./PricingPlanInfluencer";

const subscriptionService = new SubscriptionService();

// The two tabs, mapped both ways between the react-bootstrap eventKey and the
// ?user_type= value that appears in the URL.
const TAB_KEY_BY_USER_TYPE = { brand: "first", influencer: "second" };
const USER_TYPE_BY_TAB_KEY = { first: "brand", second: "influencer" };
const DEFAULT_TAB_KEY = "first";

// Display order for premium plans (lower = shown first).
const PLAN_ORDER = {
  Monthly: 1,
  Quarterly: 2,
  "Half-Yearly": 3,
  Annually: 4,
  Starter: 1,
  Savings: 2,
};

const isFreePlan = (p) =>
  !p ||
  p.plan_name === "FOC" ||
  p.plan_name === "BASIC" ||
  p.plan_type === "free" ||
  p.user_status === "Free" ||
  Number(p.amount) === 0;

const sortPremium = (rows) =>
  (rows || [])
    .filter((p) => !isFreePlan(p))
    .sort(
      (a, b) => (PLAN_ORDER[a.plan_name] || 99) - (PLAN_ORDER[b.plan_name] || 99)
    );

const isBasicRow = (p) =>
  ["basic", "foc"].includes(String(p?.plan_name || "").toLowerCase());
const isTrialRow = (p) => String(p?.plan_name || "").toLowerCase() === "trial";

// Reading order of the influencer cards: BASIC -> Trial -> paid tiers (cheapest
// first). The API already returns them this way; this only guarantees it for
// the hardcoded fallback and for any future row the backend doesn't rank.
const cardRank = (p) => (isBasicRow(p) ? 0 : isTrialRow(p) ? 1 : 2);
const sortInfluencerCards = (rows) =>
  (rows || [])
    .slice()
    .sort(
      (a, b) =>
        cardRank(a) - cardRank(b) ||
        (PLAN_ORDER[a.plan_name] || 99) - (PLAN_ORDER[b.plan_name] || 99)
    );

// Hardcoded fallback — also the first paint, since the plans are fetched on the
// client (the backend resolves the visitor's country from the request, so the
// call has to carry the visitor's own IP, not the server's). No Trial row here:
// whether a trial is on offer is a live, country-specific decision, so the card
// only ever appears once the API has answered.
const FALLBACK_BRAND = sortPremium(Object.values(SubscriptionPlanData.brand));
const FALLBACK_INFLUENCER = sortInfluencerCards(
  Object.values(SubscriptionPlanData.influencer)
);

// A foreign (non-India) visitor is served either dedicated local-currency plans
// (backend stamps zap_only on every row, including the shared free/FOC one) or
// the India plans converted to USD for display (non-₹ currency_symbol). Either
// marker means "hide the India-only marketplace features".
const isForeignResponse = (rows) =>
  (rows || []).some(
    (r) =>
      Number(r.zap_only) === 1 ||
      (r.currency_symbol && r.currency_symbol !== "₹")
  );

const Pricing = () => {
  const [brandPremium, setBrandPremium] = useState(FALLBACK_BRAND);
  // Every influencer card (BASIC/FOC, Trial, paid tiers) is rendered straight
  // from the API rows — they carry the `entitlements` that drive the ZAP
  // feature list, so a limit change in the DB shows up here with no release.
  const [influencerCards, setInfluencerCards] = useState(FALLBACK_INFLUENCER);
  // Zap-only (foreign) is a property of the visitor, not of one plan: the
  // hardcoded fallback rows carry no marker at all, so the flag is resolved once
  // for the whole page and handed to every card.
  const [influencerForeign, setInfluencerForeign] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchPlans() {
      try {
        const request = (user_type) =>
          subscriptionService.getPlanDetails({
            user_type,
            account_id: 0,
            platform: "web",
            geo_pricing: true,
          });

        const [brandRes, inflRes] = await Promise.all([
          request("Brand"),
          request("Influencer"),
        ]);

        if (!mounted) return;

        const brandRows = sortPremium(brandRes?.data?.rows);
        const inflRows = sortInfluencerCards(inflRes?.data?.rows);

        if (brandRows.length) setBrandPremium(brandRows);
        if (inflRows.length) setInfluencerCards(inflRows);
        // Read off the full response so the flag survives even if a future
        // filter drops the row that carries it.
        setInfluencerForeign(isForeignResponse(inflRes?.data?.rows));
      } catch (error) {
        // Keep the fallback plans already in state.
        console.error("Pricing: failed to load plans, using fallback", error);
      }
    }

    fetchPlans();
    return () => {
      mounted = false;
    };
  }, []);

  // The visible tab is mirrored in ?user_type= so the URL is shareable. The
  // param is read (not rendered) on mount to keep the server/client markup
  // identical, and written with replaceState so switching tabs neither
  // re-fetches the plans nor piles up history entries.
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB_KEY);

  const writeUserType = (tabKey) => {
    const params = new URLSearchParams(window.location.search);
    params.set("user_type", USER_TYPE_BY_TAB_KEY[tabKey]);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params}${window.location.hash}`
    );
  };

  useEffect(() => {
    const syncFromUrl = () => {
      const userType = new URLSearchParams(window.location.search)
        .get("user_type")
        ?.toLowerCase();
      const tabKey =
        userType && Object.hasOwn(TAB_KEY_BY_USER_TYPE, userType)
          ? TAB_KEY_BY_USER_TYPE[userType]
          : undefined;

      setActiveTab(tabKey || DEFAULT_TAB_KEY);
      // Nothing usable in the URL (first visit, or a stale/unknown value):
      // stamp the tab that is actually showing.
      if (!tabKey) writeUserType(DEFAULT_TAB_KEY);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const handleTabSelect = (tabKey) => {
    if (!tabKey || !Object.hasOwn(USER_TYPE_BY_TAB_KEY, tabKey)) return;
    setActiveTab(tabKey);
    writeUserType(tabKey);
  };

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
            <Tab.Container
              id="left-tabs-example"
              activeKey={activeTab}
              onSelect={handleTabSelect}
            >
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
                        <div className=" sidebar-nav mb-0"></div>
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
                                          (featureText, index) => {
                                            return (
                                              <li key={index}>
                                                {featureText.text}
                                              </li>
                                            );
                                          }
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
                              {brandPremium.map((plan) => (
                                <PricingPlanBrand
                                  key={plan.plan_id || plan.id || plan.plan_name}
                                  subscription_plan={plan}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="pt-2 plan-tab-influencer">
                  <main className="full-width pb-3 page-pricing">
                    <div className="pricing-tab p-0">
                      <div className="tab-content" id="">
                        <div className="pricing-sec-infl pricing-plan-influencer">
                          <div className="pricing-sec-right">
                            <div className="pricing-plan-sec">
                              <div className="pricing-plan-inner">
                                {influencerCards.map((plan) => (
                                  <PricingPlanInfluencer
                                    key={
                                      plan.plan_id || plan.id || plan.plan_name
                                    }
                                    subscription_plan={plan}
                                    isForeign={influencerForeign}
                                  />
                                ))}
                              </div>
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
