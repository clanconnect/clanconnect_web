'use client';
import React from "react"
import PropTypes from "prop-types"
import BlogsContainer from "./pages/Blogs/Container";
import CaseStudyContainer from "./pages/CaseStudy";


class StaticCaseStudyPage extends React.Component {
  render() {
    console.log(this.props.blog_id)
    return (
      <>
        <CaseStudyContainer />
        {/* <Investors /> */}
      </>
    );
  }
}

StaticCaseStudyPage.propTypes = {
  greeting: PropTypes.string
};
export default StaticCaseStudyPage
