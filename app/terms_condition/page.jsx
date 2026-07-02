import { TermsConditions } from '@/components/pages/Policy';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Terms & Conditions',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/terms_condition',
  },
  openGraph: {
    title: 'ClanConnect - Terms & Conditions',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/terms_condition',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/terms-conditions.png',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function TermsConditionPage() {
  return <TermsConditions />;
}
