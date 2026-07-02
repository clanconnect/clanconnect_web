'use client';
import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import NewBanner from './NewBanner';
import TabBrands from './TabBrands';
import TabInfluencers from './TabInfluencers';
import FeaturedCampaign from './FeaturedCampaign';
import Brands from './Brands';
import WhyClanConnect from './whyClanConnect';
import NewBannerMobile from './NewBannerMob';
import TabConfigurator from './TabConfigurator';
import {HomePageVideo} from './HomePageVideo';
import {Punchline} from './Punchline';
import Testimonials from './Testimonials';
import TestimonialsInfluencers from './TestimonialsInfluencer';
import SEO from '../../SEO';
const StaticHomePage = () => {
  useEffect(() => {
    const homePageClass = document.getElementsByTagName('body')[0];
    homePageClass.classList.add('page-home');
  }, []);
  // const [videoEnded, setVideoEnded] = useState(false)
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   setVideoEnded(videoEnded)
  // }
  return (
    <React.Fragment>
      <SEO title="Influencer Marketing Platform for company & agency | ClanConnect" url="https://www.clanconnect.ai" image="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/homepage.jpg" description="Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers." />
      <NewBanner className='d-none' />
      <Punchline className='d-none' />
      {/* <NewBannerMobile /> */}
      <Testimonials />
      <TabBrands />
      
      {/* <TabConfigurator /> */}
      <TabInfluencers />
      {/* <TestimonialsInfluencers /> */}
      <FeaturedCampaign />
      {/* <Brands /> */}
      <WhyClanConnect />
      
    </React.Fragment>
  );
};

export default StaticHomePage;
