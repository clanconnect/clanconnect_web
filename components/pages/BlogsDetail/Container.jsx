'use client';
import React, {useState, useEffect} from 'react';
import {Link, useParams} from '@/lib/router';
import {blogsData} from '../../../data/data';

const BlogsDetailContainer = (props) => {
  useEffect(() => {
    const addClass = document.querySelector('body');
    addClass.classList.add('page-blog-detail');

    return () => {
      addClass.classList.remove('page-blog-detail');
    };
  }, []);

  return (
    <section className='blog-sec brandBackground'>
      <div className='container container-blogs '>
        <div className='banner-innerpage'>
          <img
            src={props.blogData.newsImage}
            alt={props.blogData.newsTitle}
            style={{objectFit: 'contain'}}
          />
        </div>
        <div className='blog-content-desc sec-common'>
          <div className='container'>
            <h1>{props.blogData.newsTitle}</h1>
            <p>{props.blogData.newsDescription}</p>
            <div dangerouslySetInnerHTML={{__html: props.blogData.content}} />
            <div className='d-flex justify-content-center my-5'>
              <a className='btn btn-black btn-wide' href='/blogs'>
                View all blogs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogsDetailContainer;
