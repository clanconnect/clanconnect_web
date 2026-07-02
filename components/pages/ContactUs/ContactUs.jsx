'use client';
import React, {useEffect, useState} from 'react';
import { Helmet } from '@/lib/helmet';
import { PublicService } from '../../../core/services/public.service';

const publicService = new PublicService();

const ContactUs = () => {
  const [communityLinks, setCommunityLinks] = useState({WHATSAPP_COMMUNITY: '', TELEGRAM_COMMUNITY: ''})
  const getSetCommunityLinks = async () => {
    try {
      const response = await publicService.get_community_links();
      setCommunityLinks(response.data.rows);
    } catch (error) {
      console.error('Error getSetCommunityLinks:', error);
    }
  };
  useEffect(() => {
    getSetCommunityLinks();
  }, []);

  return (
    <>
    <Helmet>
        <title>ClanConnect - Contact Us</title>
        <link rel="canonical" href="https://www.clanconnect.ai/contact_us" />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content="https://www.clanconnect.ai/contact_us" />
        <meta property="og:title" content="ClanConnect - Contact Us" />
        <meta property="og:description" content="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers." />
        <meta property="og:image" content="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/contact-us.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
    </Helmet>
    <div className='container-part-new request-demo contact-us'>
      <div className='d-flex flex-column w-100'>
        <div className='homeBanner homeBannerLatest inner news'>
          <div className='container'>
            <div className='banner-content'>
              <h1 className='banner-innerpage-heading'>Contact Us</h1>
            </div>
          </div>
        </div>
        <div className='row flex-1 displayCenter signup-form-sec pt-0 w-100'>
          <div className='container d-flex w-100'>
            <div className='cont-us-info'>
              <div className='cont-us-info-detail'>
                <strong>Brands &amp; Advertisers </strong>
                <span>
                  If you are a brand or advertiser with campaign requirements, <br/> &nbsp;
                  contact us at <a href='mailto:brand.support@clanconnect.ai'>
                    brand.support@clanconnect.ai
                  </a>
                </span>
                <span className='pb-4'>
                  or <br/> Call Us at: <a href='tel:011-41193911'>011-41193911</a>
                </span>
              </div>
              <div className='cont-us-info-detail'>
                <strong>Influencers &amp; Talent Partners</strong>
                <span className='pb-4'>
                  If you are an influencer or talent partner, <br />email us at <a href='mailto:influencer.support@clanconnect.ai'>
                    influencer.support@clanconnect.ai
                  </a> <br/>or <br/> <span className='pb-4 d-inline-flex'>reach out via WhatsApp at&nbsp;<a href='tel:9289315858'>9289315858</a>.</span>
                  <br/><span className='fs-14'>Stay updated on campaigns by joining our community <a target='_blank' href={communityLinks.WHATSAPP_COMMUNITY}>here</a>.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
