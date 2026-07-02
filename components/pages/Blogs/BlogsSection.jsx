'use client';
import React from 'react';
import {Link} from '@/lib/router';
import {blogsData} from '../../../data/data';

const BlogsSection = () => {
  return (
    <section className='sec-common'>
      <div className='container'>
        <div className='card-sec row'>
          {blogsData.slice().reverse().map((bl) => {
            return (
              <div key={bl.id} className='col-sm-6 col-md-4'>
                <Link
                  to={`/blogs/blog_detail?blogId=${bl.id}`}
                  className='card'
                >
                  <span className='card-img'>
                    <img src={bl.newsImage} alt='' />
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
