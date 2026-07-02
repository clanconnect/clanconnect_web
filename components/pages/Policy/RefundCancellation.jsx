'use client';
import React from 'react';
import { Helmet } from '@/lib/helmet';
import {Link} from '@/lib/router';

export const RefundCancellation = () => {
  return (
    <>
    <Helmet>
      <title>ClanConnect - Refund & Cancellation</title>
      <link rel="canonical" href="https://www.clanconnect.ai/refund_cancellation_policy" />
      <meta name="robots" content="index, follow" />
      <meta property="og:url" content="https://www.clanconnect.ai/refund_cancellation_policy" />
      <meta property="og:title" content="ClanConnect - Refund & Cancellation" />
      <meta property="og:description" content="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers." />
      <meta property="og:image" content="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/cancellation-refund.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
    </Helmet>
    <main className='main-content-sec padd-content-top110 full-width'>
      <div className='container-fluid'>
        <div className='bg-white content-bg p-3'>
          <div className='container custom-container'>
            <h3 className='title-w-bdr'>
              <span>Cancellation and Refund Policy</span>
            </h3>
            <div className='content-info'>
              <p>
                <strong>IRIDA INTERACTIVE PRIVATE LIMITED</strong> has an online
                platform connecting brands and influencers to collaborate with
                each other, under the brand and style name of 
                <strong>“ClanConnect”</strong> having its registered office at
                2ND FLOOR, 249, Okhla Phase 3 Road, Okhla Industrial Estate
                Phase 3, New Delhi, South East Delhi, 110020, India (“
                <i>hereinafter referred to as</i> <strong>“ClanConnect”</strong>
                , <strong>“we”</strong>, <strong>“our”</strong>, 
                <strong>“us”</strong> and <strong>“Company”</strong>).
              </p>

              <p>
                This cancellation and refund policy <strong>(“Policy”)</strong>{' '}
                constitutes the terms and conditions concerning the cancellation
                of the plan opted by the user and subsequent refund (if allowed)
                on the Platform. This Policy along with the &quot;
                <Link to='/terms_condition'>Terms of Use</Link>”, the{' '}
                <Link to='/privacy_policy/'>“Privacy Policy”</Link>, the
                <Link to='/pricing_policy'>“Pricing Policy”</Link> and any other
                policies as may be applicable collectively constitute a binding
                agreement between the user and the Company (
                <i>collectively referred to as </i>
                <strong>“Agreement”</strong>).
              </p>

              <p>
                Unless otherwise specified, the capitalized terms used in this
                Policy will bear the same meaning as ascribed to them in the
                Agreement. In the event of a conflict between this Policy and
                the Terms of Use or any agreement, with respect to the
                cancellation and refund method(s) provided by the Company, the
                terms of this Policy shall prevail.
              </p>

              <strong>
                <span>Cancellation</span>
              </strong>
              <p>
                By registering and creating an account with us, you are entitled
                to avail or render the Services through the use of the Platform
                by opting a basic or a premium plan, and subsequently upon
                opting for a premium plan, you will be entitled to enjoy premium
                access on the Platform during the term of the plan opted by you.
                Please note that as of now Company does not provide the option
                to cancel the plan opted by you, however, the Company may at its
                sole discretion allow you to cancel the plan and initiate refund
                (if allowed).
              </p>

              <p>
                In the event, you do not renew your premium plan before the
                expiry of the same, the premium access associated with it will
                be ceased, by virtue of which you will be downgraded to the
                basic plan automatically. However, after the expiry of your
                premium plan you can opt for the same any time again in future
                as per the Pricing Policy available at &nbsp;
                <Link to='/pricing_policy'>
                  https://clanconnect.ai/pricing_policy
                </Link>
                . The new premium plan opted by you shall begin from the date on
                which the payment for such premium plan has been successfully
                remitted from your selected payment source.
              </p>

              <p>
                The Company may amend this Policy at any time without any prior
                intimation to the user. By continuing to use the Platform, the
                user consents to the amended terms of this Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};
