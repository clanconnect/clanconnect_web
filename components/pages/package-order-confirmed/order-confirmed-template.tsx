'use client';
import React, { useState } from 'react';
const clanLogo = '/assets/images/clan_connect/clan-logo.png';
import './order-confirmed.scss'

interface Props {
  userType: string;
  planName: string;
  campaignPlanId: string;
  campaignId: string;
  modalContent?: string;
  children?: any;
}

const OrderConfirmedTemplate: React.FC<Props> = ({
  userType,
  planName,
  campaignPlanId,
  campaignId,
  modalContent,
  children
}) => {
  // enum to set support mail
  const SupportMail = {
    BRAND_SUPPORT_MAIL: 'brand.support@clanconnect.ai',
    INFLUENCER_SUPPORT_MAIL: 'influencer.support@clanconnect.ai'
  }
  // to redirect to home page after count down ends
  if (typeof window !== 'undefined' && userType === "Influencer") {
    var countdown = 5;
    var countdownInterval = setInterval(function() {
      countdown--
      document.getElementById('countdown')!.textContent = countdown.toString();
      if (countdown === 0) {
        clearInterval(countdownInterval);
        window.location.href = "/influencer/dashboard";
      }
    }, 1000);
  }
  return (
    <div className="main-content-sec padd-content-top full-width">
      <div className="confirmed-info-container">
        {userType === "Influencer" && (
          <div className="redirecting">
            <span>Redirecting in </span>
            <span id="countdown">{5}</span>
            <span> seconds...</span>
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center mt-3 mb-4">
          <img
            alt="Clan Connect"
            height="93"
            src={clanLogo}
            style={{ display: 'inline-block', verticalAlign: 'middle' }}
            width="221"
          />
        </div>
        <strong className="d-block pb-1 text-center" style={{ fontSize: '22px', color: 'green' }}>
          <span>Thank you</span>
        </strong>
        {children}
        <p className='pt-2'>
          Feel free to email us at{' '}
          {['Brand', 'Agency'].includes(userType) ? (
            <a href={SupportMail.BRAND_SUPPORT_MAIL}>{SupportMail.BRAND_SUPPORT_MAIL}</a>
          ) : (
            <a href={SupportMail.INFLUENCER_SUPPORT_MAIL}>{SupportMail.INFLUENCER_SUPPORT_MAIL}</a>
          )}{' '}
          with any questions you may have.
        </p>
        <br />
        <p style={{ color: '#0097d0', fontSize: '25px', marginBottom: '0px' }}>Thank You</p>
        <p style={{ fontSize: '18px', margin: '0px', display: 'inline-block', marginBottom:'10px' }}>Team ClanConnect</p>
        {
          ['New Campaign', 'New Paid Campaign', 'New Barter Campaign', 'Republish Campaign', 'Upgrade Barter Proposal Limit'].includes(planName)
          ?
            ['Upgrade Barter Proposal Limit'].includes(planName)
            ?
              <a href={`/brand/campaigns/proposals?planID=${campaignPlanId}&campaignID=${campaignId}`} className="btn btn-outline-primary d-flex justify-content-center">View Proposals</a>
            :
              <a href='/brand/plans' className="btn btn-outline-primary d-flex justify-content-center">View Campaign</a>
          :
            <a href='/' className="btn btn-outline-primary d-flex justify-content-center">OK</a>
        }
      </div>
    </div>
  );
};

export default OrderConfirmedTemplate;