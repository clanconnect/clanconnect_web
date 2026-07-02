'use client';
import React from 'react';
import { Helmet } from '@/lib/helmet';
import {Link} from '@/lib/router';

export const PricingPolicy = () => {
  return (
    <>
      <Helmet>
        <title>ClanConnect - Pricing Policy</title>
        <link
          rel="canonical"
          href="https://www.clanconnect.ai/pricing_policy"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:url"
          content="https://www.clanconnect.ai/pricing_policy"
        />
        <meta property="og:title" content="ClanConnect - Pricing Policy" />
        <meta
          property="og:description"
          content="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers."
        />
        <meta
          property="og:image"
          content="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/pricing-policy.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
      </Helmet>
      <main className="main-content-sec padd-content-top110 full-width">
        <div className="container-fluid">
          <div className="bg-white content-bg p-3">
            <div className="container custom-container">
              <h3 className="title-w-bdr">
                <span>Pricing Policy</span>
              </h3>
              <div className="content-info">
                <p>
                  <strong>IRIDA INTERACTIVE PRIVATE LIMITED</strong> &nbsp;has
                  an online platform connecting brands and influencers to
                  collaborate with each other, under the brand and style name
                  of&nbsp;
                  <strong>“ClanConnect”</strong>&nbsp;having its registered
                  office at 2ND FLOOR, 249, Okhla Phase 3 Road, Okhla Industrial
                  Estate Phase 3, New Delhi, South East Delhi, 110020, India
                  (“hereinafter referred to as&nbsp;
                  <strong>“ClanConnect”</strong>
                  ,&nbsp;<strong>“we”</strong>
                  ,&nbsp;<strong>“our”</strong>,&nbsp;<strong>“us”</strong>
                  &nbsp;and&nbsp;<strong>“Company”</strong>).
                </p>
                <p>
                  The terms hereof constitute the pricing policy with respect to
                  the plan options available on our Platform for our users (
                  <strong>“Pricing Policy”</strong>). This Pricing Policy along
                  with the "<Link to="/terms_condition">Terms of Use</Link>”,
                  the <Link to="/privacy_policy/">“Privacy Policy”</Link>, the “
                  <Link to="/refund_cancellation_policy">
                    Cancellation and Refund Policy
                  </Link>
                  “ and any other policy as may be applicable, collectively
                  constitute a binding agreement between the user and the
                  Company (<i>collectively referred to as</i>{" "}
                  <strong>“Agreement”</strong>
                  ).
                </p>
                <p>
                  Unless otherwise specified, the capitalized terms used in this
                  Pricing Policy will bear the same meanings as ascribed to them
                  in the Agreement. In the event of conflict between this
                  Pricing Policy and the Terms of Use or any other agreement,
                  with respect to the pricing method provided by the Company,
                  the terms of this Pricing Policy will prevail over all such
                  agreements.
                </p>
                <strong>
                  <span>Payment and Pricing</span>
                </strong>
                <p>
                  The Company has introduced different plans&nbsp;(
                  <i>as enumerated below</i>)&nbsp;for all the users to access
                  the Platform as per their requirements. The Company reserves
                  the sole right to determine the eligible payment methods for
                  the users to avail the plans provided by the Company on the
                  Platform. Subject to the same, it is expressly declared that
                  the user shall not use, for the purpose of payment, any credit
                  or debit card issued outside India or virtual bank account.
                  Further, if you are a foreign influencer or a brand and want
                  to be engaged with us, you may do so, by reaching out to us.
                </p>
                <p>
                  After successfully completing the registration process, the
                  user shall opt for the relevant plan depending on its
                  preference/ requirements.
                </p>
                <ol>
                  <li>
                    <strong>For Influencers:</strong>
                    {/* <p>
                      The Company offers a basic and a premium plan for availing
                      the benefits provided under the Platform. Please note that
                      all plans mentioned below and their details as available
                      on the Platform are subject to change, as per the sole
                      discretion of the Company. The details of the plans are:
                    </p> */}
                    <p>
                      The Company offers multiple subscription plans for
                      availing the benefits and services provided on the
                      Platform, including through the web platform and the Clan
                      for Creators mobile application (available on iOS and
                      Android).
                    </p>
                    <p>
                      All plans, pricing, features, and related details as
                      displayed on the Platform are subject to change at the
                      sole discretion of the Company. Upon successful
                      registration, an influencer may be enrolled in a free plan
                      with limited benefits. Influencers may upgrade to a paid
                      subscription plan either at the time of registration or at
                      any time thereafter through the Platform.
                    </p>
                    <ol className="roman">
                      <li>
                        <u>Subscription & Auto-Renewal</u> - All paid
                        subscription plans are offered on an auto-renewal basis
                        where applicable (including purchases made via the web
                        platform and iOS). By subscribing to a paid plan, the
                        influencer authorizes recurring payments through the
                        selected payment method. The subscription will
                        automatically renew at the end of the applicable billing
                        cycle unless cancelled by the influencer.
                      </li>
                      <li>
                        <u>Cancellation Policy</u> - The Platform does not
                        currently provide an in-app or on-platform cancellation
                        feature. Influencers are required to cancel their
                        subscription directly through the original payment
                        method or platform used for the purchase (for example,
                        through their respective app store account settings or
                        payment provider dashboard). Failure to cancel the
                        auto-renewal before the next billing date will result in
                        automatic charges for the subsequent billing cycle.
                      </li>
                      {/* <li>
                        <u>Basic plan</u> –This is a free plan with limited
                        benefits, which will automatically be activated by us
                        for the influencer after successfully completing the
                        registration process available on the Platform, details
                        of which are available at
                        <Link to="/pricing">
                          https://clanconnect.ai/pricing.
                        </Link>
                      </li>
                      <li>
                        <u>Premium plan</u> –This premium plan has all the
                        benefits/ services available on the Platform for the
                        influencer, details of which are available at{" "}
                        <Link to="/pricing">
                          https://clanconnect.ai/pricing.
                        </Link>
                        The influencer may choose to upgrade basic plan to this
                        premium plan either at the time of registration or
                        anytime later on.
                        {/* The Company as of now offers a monthly and an
                      annual premium plan. The fee for monthly and annual plan
                      are as follows:
                      <ol className='pt-2'>
                        <li>
                          Monthly plan (1 (one) month): INR 150/- (Indian Rupees
                          One Hundred and Fifty Only) (inclusive of all the
                          taxes).
                        </li>
                        <li>
                          Annual plan (1 (one) year): INR 1200/- (Indian Rupees
                          Twelve Hundred Only) (inclusive of all the taxes).
                        </li>
                      </ol> 
                      </li> */}
                    </ol>
                  </li>
                  <li>
                    <strong>For Brands:</strong>
                    <p>
                      The Company offers a basic and a premium plan for availing
                      the benefits available on the Platform. Please note that
                      all plans mentioned below and their details as available
                      on the Platform are subject to change, as per the sole
                      discretion of the Company. The details of the plans are:
                    </p>
                    <ol>
                      <li>
                        <u>Basic plan</u> – This is a free plan with limited
                        benefits, which will automatically be activated by us
                        for the brand after successfully completing the
                        registration process available on the Platform, details
                        of which are available at
                        <Link to="/pricing">
                          https://clanconnect.ai/pricing.
                        </Link>
                      </li>
                      <li>
                        <u>Premium plan</u> – This premium plan has all the
                        benefits/ services available on the Platform for the
                        brand, details of which are available at
                        <Link to="/pricing">
                          https://clanconnect.ai/pricing
                        </Link>
                        . The brand may choose to upgrade basic plan to this
                        premium plan either at the time of registration or
                        anytime later on. The Company as of now offers 3 plans,
                        i.e., a monthly, a quarterly and an annual premium plan.
                        The fee for monthly, quarterly and annual plan are as
                        follows:
                        <ol>
                          <li>
                            Monthly plan (1 (one) month): INR 10000/- (Indian
                            Rupees Ten Thousand Only) (inclusive of all the
                            taxes).
                          </li>
                          <li>
                            Quarterly plan (4 (four) months): INR 25000/-
                            (Indian Rupees Twenty-Five Thousand Only) (inclusive
                            of all the taxes).
                          </li>
                          <li>
                            Annual plan (1 (one) year): INR 75000/- (Indian
                            Rupees Seventy-Five Thousand Only) (inclusive of all
                            the taxes).
                          </li>
                        </ol>
                      </li>
                      <li>
                        For Barter campaigns, brands need to pay Rs. 2500 +
                        taxes, if they have not upgraded to premium. For all
                        other paid campaigns, the brands need to make the
                        payment directly to the influencer, as per the timeline
                        &amp; terms stated by the influencer, irrespective of
                        the plan selected by the brand (basic or premium).
                      </li>
                    </ol>
                    <p>
                      Please note that there is no auto renewal feature
                      available for the premium plan for any user. Upon expiry
                      of the premium plan, you will be downgraded to the basic
                      plan automatically. For avoidance of any doubt, if you
                      wish to avail the benefit associated with the premium plan
                      again, you will have to get the same renewed at least 1
                      (one) day before its expiry or any time after its expiry.
                    </p>
                    <p>
                      Further, the Company as of now does not offer the facility
                      to cancel the premium plan availed by the user. For more
                      details on cancellation, please visit our Cancellation and
                      Refund Policy available at{" "}
                      <Link to="/refund_cancellation_policy">
                        https://clanconnect.ai/refund_cancellation_policy
                      </Link>
                      .
                    </p>
                    <p>
                      The Company may at its sole discretion at any time amend
                      and/ or make changes in this Pricing Policy. By continuing
                      to use the Platform, the user consents to the amended
                      terms of this Pricing Policy.
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
