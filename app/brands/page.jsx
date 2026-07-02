import BrandContainer from '@/components/pages/Brands/Container';

const DESCRIPTION =
  'Discover, engage and analyse the best influencers for your campaigns with ClanConnect - The Most Democratic Influencer Marketing Platform of the World.';

export const metadata = {
  title: 'Influencer Marketing Platform for company & agency | ClanConnect - Brands',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/brands',
  },
  openGraph: {
    title: 'Influencer Marketing Platform for company & agency | ClanConnect - Brands',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/brands',
    type: 'website',
  },
};

export default function BrandsPage() {
  return <BrandContainer />;
}
