import { PricingPolicy } from '@/components/pages/Policy';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Pricing Policy',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/pricing_policy',
  },
  openGraph: {
    title: 'ClanConnect - Pricing Policy',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/pricing_policy',
    type: 'website',
  },
};

export default function PricingPolicyPage() {
  return <PricingPolicy />;
}
