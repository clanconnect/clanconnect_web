import { redirect } from 'next/navigation';
import CaseStudiesDetailContainer from '@/components/pages/CaseStudyDetail/Container';
import { caseStudyDetailData } from '@/data/data';

const findDetailData = (caseStudyDetailId) =>
  caseStudyDetailData?.find((b) => caseStudyDetailId === b.id);

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const detailData = findDetailData(params.case_study_detail_id);
  if (!detailData) {
    return { title: 'Influencer Marketing Platform for company & agency | ClanConnect - Case Studies' };
  }

  const canonicalUrl = `https://www.clanconnect.ai/case_studies/case_study_detail?case_study_detail_id=${detailData?.caseStudyId}`;
  const title = `Influencer Marketing Platform for company & agency | ClanConnect - ${detailData.brandName}`;
  const description =
    detailData.differentDescription || `Check out our case study on ${detailData.brandName}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: detailData.brandPost?.[0]?.brandPostImg
        ? [
            {
              url: detailData.brandPost[0].brandPostImg,
              width: 1200,
              height: 627,
              alt: detailData.brandName,
            },
          ]
        : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({ searchParams }) {
  const params = await searchParams;
  const detailData = findDetailData(params.case_study_detail_id);
  if (!detailData) redirect('/case_studies');

  return <CaseStudiesDetailContainer detailData={detailData} />;
}
