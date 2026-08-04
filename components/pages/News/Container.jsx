'use client';
import React, {useState, useEffect} from 'react';
import {Link, useParams} from '@/lib/router';
import Img from '@/components/ui/Img';
import {NewsData} from '../../../data/data';

// .news-card is 1 / 2 / 3 / 4 columns across 576/768/1025px, inside a 1360px
// container -- so it never renders wider than ~340px.
const NEWS_SIZES =
  '(max-width: 575px) 100vw, (max-width: 767px) 50vw, (max-width: 1024px) 33vw, 340px';
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
          NewsData?.slice()?.reverse()?.map((data, index) => (
            <Link
              className='news-card'
              key={data.id}
              to={data.postLink}
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='news-card-image'>
                {/* `fill` rather than intrinsic sizing: most of these are
                    hotlinked from press sites, so their dimensions are not
                    knowable at build time. The container is a fixed 165px-tall
                    box, which is all `fill` needs. */}
                <Img
                  src={data.postimage}
                  alt={data.headLine || ''}
                  fill
                  sizes={NEWS_SIZES}
                  style={{objectFit: 'cover'}}
                  priority={index < 4}
                />
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
