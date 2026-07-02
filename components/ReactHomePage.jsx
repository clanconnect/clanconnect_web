'use client';
import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import NewBanner from './pages/Home/NewBanner';
import TabBrands from './pages/Home/TabBrands';
import TabInfluencers from './pages/Home/TabInfluencers';
import FeaturedCampaign from './pages/Home/FeaturedCampaign';
import Brands from './pages/Home/Brands';
import WhyClanConnect from './pages/Home/whyClanConnect';
import NewBannerMobile from './pages/Home/NewBannerMob';
import TabConfigurator from './pages/Home/TabConfigurator';
import {HomePageVideo} from './pages/Home/HomePageVideo';
import {Punchline} from './pages/Home/Punchline';
const StaticHomePage = () => {
  // const [videoEnded, setVideoEnded] = useState(false)
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   setVideoEnded(videoEnded)
  // }
  return (
    <React.Fragment>
      {/* <NewBanner className='d-none' />
       <Punchline className="d-none"/> 
       <NewBannerMobile  />
      <TabBrands />
      <TabConfigurator />
      <TabInfluencers />
      <FeaturedCampaign />
      <Brands />
      <WhyClanConnect /> */}
    </React.Fragment>
  );
};

export default StaticHomePage;
