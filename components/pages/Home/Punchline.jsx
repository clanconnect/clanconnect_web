'use client';
import React from 'react';
import Slider from 'react-slick';
import {HomeBannerData} from '../../../data/data';
import {Link, NavLink} from '@/lib/router';

export const Punchline = () => {
  return (
    <div className='sec-common sec-punchline sec-common-config d-none'>
      <div className='triangle-arrow-sec'>
        <span className='triangle-bg triangle2'></span>
        <span className='triangle-bg triangle3'></span>
        <span className='triangle-bg triangle4'></span>
        <span className='triangle-bg triangle5'></span>
        <span className='triangle-bg triangle6'></span>
        <span className='triangle-bg triangle7'></span>
        <span className='triangle-bg triangle8'></span>
        <span className='triangle-bg triangle9'></span>
      </div>
      <div className='container'>
        <h1>
          The Most Democratic Influencer <br /> Marketing Platform of the World.{' '}
        </h1>
        <div className='punchline-slide-sec'>
          <div className='punchline-slide'>
            <strong className='pb-4 d-block'>For Brands & Advertisers</strong>
            <div className='banner-caption-contain'>
              {HomeBannerData.HomeBannerSlider.map((bannerData) => {
                return bannerData.brands?.map((brandData) => {
                  return (
                    <div key={brandData.id} className='banner-caption'>
                      <div className='banner-caption-right'>
                        <div className='banner-caption-center'>
                          {/* <span className='banner-caption-arrow-sec'>
                            <span className='banner-caption-arrow'></span>
                            <span className='banner-caption-arrow1'></span>
                          </span> */}
                          <span className='triangle-border triangle-border-inner'></span>

                          <strong>{brandData.bannerCaptionCenterTitle}</strong>
                        </div>
                        <div className='banner-caption-bottom'>
                          <span className='banner-caption-bottom-desc-mob'>
                            {brandData.bannerCaptionBottomTitle}&nbsp;
                          </span>
                          <Link to='/our_business_models'>
                            {brandData.bannerCaptionBottomAnchor}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
            {/* <div className='d-flex mt-auto'>
                            <a href="/request_demo" className='btn btn-black fs-16'>Request a demo</a>
                        </div> */}
          </div>

          <div className='punchline-slide'>
            <strong className='pb-4 d-block'>
              For Influencers & Talent Partners
            </strong>

            <div className='banner-caption-contain'>
              {HomeBannerData.HomeBannerSlider.map((bannerData) => {
                return bannerData.influencers?.map((brandData) => {
                  return (
                    <div key={brandData.id} className='banner-caption'>
                      <div className='banner-caption-right'>
                        <div className='banner-caption-center'>
                          {/* <span className='banner-caption-arrow-sec'>
                            <span className='banner-caption-arrow'></span>
                            <span className='banner-caption-arrow1'></span>
                          </span> */}
                          <span className='triangle-border triangle-border-inner'></span>
                          <strong>{brandData.bannerCaptionCenterTitle}</strong>
                        </div>
                        <div className='banner-caption-bottom'>
                          <span className='banner-caption-bottom-desc-mob'>
                            {brandData.bannerCaptionBottomTitle}&nbsp;
                          </span>
                          <a href='/our_business_models'>
                            {brandData.bannerCaptionBottomAnchor}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
            <div className='d-flex mt-auto'>
              <Link
                target='_blank'
                to='https://app.clanconnect.ai'
                className='btn btn-black fs-16'
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
