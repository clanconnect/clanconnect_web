'use client';

import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import BlogsDetailContainer from "./pages/BlogsDetail/Container";
import { blogsData } from "../data/data";
import { useParams } from "@/lib/router";


const StacticBlogDetailPage = (props) => {
  console.log(props)
  console.log(props.blog_id)
  const [blogs, setBlogs] = useState([])
    // const { blogId } = useParams()
    const blogData = blogsData && blogsData?.find((b) => {
      return Number(props.blog_id) === b.id
    })
    // setBlogs(blogData)
    // useEffect(() => {
    //   setBlogs(blogData)
    // }, [])
    
    return (
      <>  
        <BlogsDetailContainer blogData={blogData} />
        {/* <Investors /> */}
      </>
    );
  
}

export default StacticBlogDetailPage
