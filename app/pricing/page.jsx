import Pricing from '@/components/pages/Pricing/Pricing';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Pricing',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/pricing',
  },
  openGraph: {
    title: 'ClanConnect - Pricing',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/pricing',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/faqs.png',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function PricingPage() {
  return <Pricing />;
}
