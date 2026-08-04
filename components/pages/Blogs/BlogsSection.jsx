'use client';
import React from 'react';
import {Link} from '@/lib/router';
import Img from '@/components/ui/Img';
import {blogsData} from '../../../data/data';

// .card-sec .card-img img is a 100%-wide, 300px-tall cover box inside a
// col-sm-6 col-md-4 grid (1 / 2 / 3 columns). At >=768px a card measures ~28vw,
// so express it in vw rather than a fixed px -- a fixed 380px would under-serve
// the ~400px slot on a 1440 viewport and render slightly soft.
const CARD_SIZES = '(max-width: 575px) 100vw, (max-width: 767px) 50vw, 28vw';

const BlogsSection = () => {
  return (
    <section className='sec-common'>
      <div className='container'>
        <div className='card-sec row'>
          {blogsData.slice().reverse().map((bl, index) => {
            return (
              <div key={bl.id} className='col-sm-6 col-md-4'>
                <Link
                  to={`/blogs/blog_detail/${bl.id}`}
                  className='card'
                >
                  <span className='card-img'>
                    <Img
                      src={bl.newsImage}
                      alt={bl.newsTitle || ''}
                      sizes={CARD_SIZES}
                      // The first row is above the fold on desktop; the rest
                      // lazy-load as the grid scrolls into view.
                      priority={index < 3}
                    />
                  </span>
                  <div className='card-content'>
                    <h2>{bl.newsTitle}</h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
