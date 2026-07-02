import CaseStudyContainer from '@/components/pages/CaseStudy';

const DESCRIPTION =
  'ClanConnect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'Influencer Marketing Platform for company & agency | ClanConnect - Case Studies',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/case_studies',
  },
  openGraph: {
    title: 'Influencer Marketing Platform for company & agency | ClanConnect - Case Studies',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/case_studies',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/case-studies.png',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function CaseStudiesPage() {
  return <CaseStudyContainer />;
}
