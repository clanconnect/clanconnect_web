'use client';
import React from 'react';
import PropTypes from 'prop-types';
// import BlogsContainer from './pages/Blogs/Container';
import CaseStudyContainer from './Container';
import SEO from '../../SEO';

class StaticCaseStudyPage extends React.Component {
  render() {
    return (
      <>
        <SEO title="Influencer Marketing Platform for company & agency | ClanConnect - Case Studies" url="https://www.clanconnect.ai/case_studies" description="ClanConnect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers." image="https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/case-studies.png" />
        <CaseStudyContainer />
        {/* <Investors /> */}
      </>
    );
  }
}

StaticCaseStudyPage.propTypes = {
  greeting: PropTypes.string,
};
export default StaticCaseStudyPage;
