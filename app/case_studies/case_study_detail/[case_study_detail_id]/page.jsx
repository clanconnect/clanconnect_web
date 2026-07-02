import { notFound } from 'next/navigation';
import CaseStudiesDetailContainer from '@/components/pages/CaseStudyDetail/Container';
import { caseStudyDetailData } from '@/data/data';

const findDetailData = (caseStudyDetailId) =>
  caseStudyDetailData?.find((b) => caseStudyDetailId === b.id);

// Pre-render one static page per case study. dynamicParams:false means any id
// not in this list is a 404 rather than an on-demand render (required for export).
export function generateStaticParams() {
  return (caseStudyDetailData || []).map((c) => ({ case_study_detail_id: String(c.id) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { case_study_detail_id } = await params;
  const detailData = findDetailData(case_study_detail_id);
  if (!detailData) {
    return {
      title: 'Influencer Marketing Platform for company & agency | ClanConnect - Case Studies',
    };
  }

  const canonicalUrl = `https://www.clanconnect.ai/case_studies/case_study_detail/${detailData.id}`;
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

export default async function CaseStudyDetailPage({ params }) {
  const { case_study_detail_id } = await params;
  const detailData = findDetailData(case_study_detail_id);
  if (!detailData) notFound();

  return <CaseStudiesDetailContainer detailData={detailData} />;
}
