'use client';
import React, {useState, useEffect} from 'react';
import {Link, useParams} from '@/lib/router';
import {NewsData} from '../../../data/data';
const NewsContainer = (props) => {
  useEffect(() => {
    const addClass = document.querySelector('body');
    addClass.classList.add('common-bg-page');

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      addClass.classList.remove('common-bg-page');
    };
  }, []);
  return (
    <>
      <div className='homeBanner homeBannerLatest inner news'>
        <div className='container'>
          <div className='banner-content'>
            <h1 className='banner-innerpage-heading'>In News</h1>
          </div>
        </div>
      </div>
      <div className='News_Container'>
        {NewsData &&
          NewsData?.slice()?.reverse()?.map((data) => (
            <Link
              className='news-card'
              key={data.id}
              to={data.postLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='news-card-image'>
                <img src={data.postimage}></img>
              </div>
              <div className='news-card-info'>
                <span className='news-date'>{data.date}</span>
                <span className='news-headline'>{data.headLine}</span>{' '}
                <span className='news-link'>
                  <span className='banner-caption-arrow-sec'>
                    <span className='banner-caption-arrow'></span>
                    <span className='banner-caption-arrow1'></span>
                  </span>
                  &ensp;&ensp;&ensp;&ensp; Read more at
                  <span className='news-source'>
                    &nbsp;
                    {data.newsSource}
                  </span>
                </span>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default NewsContainer;
