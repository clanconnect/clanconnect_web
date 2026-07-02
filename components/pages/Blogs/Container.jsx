'use client';
import React, {useEffect} from 'react';
import BlogsSection from './BlogsSection';

const BlogsContainer = () => {
  useEffect(() => {
    const addClass = document.querySelector('body');
    addClass.classList.add('common-bg-page');

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      addClass.classList.remove('common-bg-page');
    };
  }, []);
  return (
    <div className='page-blog'>
      <div className='homeBanner homeBannerLatest inner news'>
        <div className='container'>
          <div className='banner-content'>
            <h1 className='banner-innerpage-heading'>Blogs</h1>
          </div>
        </div>
      </div>
      <BlogsSection />
    </div>
  );
};

export default BlogsContainer;
