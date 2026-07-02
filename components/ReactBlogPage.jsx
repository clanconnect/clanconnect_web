'use client';
import React from "react"
import PropTypes from "prop-types"
import BlogsContainer from "./pages/Blogs/Container";


class StacticBlogPage extends React.Component {
  render() {
    console.log(this.props.blog_id)
    return (
      <>
        <BlogsContainer />
        {/* <Investors /> */}
      </>
    );
  }
}

StacticBlogPage.propTypes = {
  greeting: PropTypes.string
};
export default StacticBlogPage
