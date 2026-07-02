'use client';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import BlogsDetailContainer from './Container';
import {blogsData} from '../../../data/data';
import {useLocation, useParams} from '@/lib/router';
import { Helmet } from '@/lib/helmet';

const StacticBlogDetailPage = (props) => {
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogDetailId = searchParams.get('blogId');

  const blogData =
    blogsData &&
    blogsData?.find((b) => {
      return Number(blogDetailId) === b.id;
    });
  // setBlogs(blogData)
  // useEffect(() => {
  //   setBlogs(blogData)
  // }, [])
  const canonicalUrl = `https://www.clanconnect.ai/blogs/blog_detail?blogId=${blogData.id}`;
  return (
    <>
      <Helmet>
        <title>ClanConnect - {blogData.newsTitle}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content="https://www.clanconnect.ai/our_business_models/1" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={blogData.newsTitle || 'ClanConnect - Blogs'} />
        <meta property="og:description" content={blogData.newsDescription || "Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers."} />
        <meta property="og:image" content={blogData.newsImage || "https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/blog.jpg"} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
      </Helmet>
      <BlogsDetailContainer blogData={blogData} />
      {/* <Investors /> */}
    </>
  );
};

export default StacticBlogDetailPage;
