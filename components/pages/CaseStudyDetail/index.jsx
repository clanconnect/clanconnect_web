'use client';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// import BlogsDetailContainer from './pages/BlogsDetail/Container';
import {caseStudyDetailData} from '../../../data/data';
import {useLocation, useParams} from '@/lib/router';
import CaseStudiesDetailContainer from './Container';
import SEO from '../../SEO';

const StacticCaseStudyDetailPage = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const caseStudyDetailId = searchParams.get('case_study_detail_id');

  const detailData =
    caseStudyDetailData &&
    caseStudyDetailData?.find((b) => {
      // console.log('b', b);
      return caseStudyDetailId === b.id;
    });

  // Define the canonical URL based on the current path or a clean URL
  const canonicalUrl = `https://www.clanconnect.ai/case_studies/case_study_detail?case_study_detail_id=${detailData?.caseStudyId}`;


  return (
    <>
      <SEO title={`Influencer Marketing Platform for company & agency | ClanConnect - ${detailData.brandName}`} url={canonicalUrl} description={detailData.differentDescription || 'Check out our case study on ' + detailData.brandName} image={detailData.brandPost?.[0]?.brandPostImg} alt={detailData.brandName} />
      <CaseStudiesDetailContainer detailData={detailData} />
      {/* <Investors /> */}
    </>
  );
};

export default StacticCaseStudyDetailPage;
