'use client';
import { caseStudyDetailData } from '../data/data';
import CaseStudiesDetailContainer from './pages/CaseStudyDetail/Container';

const StacticCaseStudyDetailPage = (props) => {
  const detailData =
    caseStudyDetailData &&
    caseStudyDetailData?.find((b) => {
      console.log(b);

      return props.case_study_detail_id === b.id;
    });

  return <CaseStudiesDetailContainer detailData={detailData} />;
};

export default StacticCaseStudyDetailPage;
