import InfluencerContainer from '@/components/pages/Influencers/Container';

const DESCRIPTION =
  'Get discovered by top brands, collaborate on campaigns and manage your earnings with ClanConnect - The Most Democratic Influencer Marketing Platform of the World.';

export const metadata = {
  title: 'Influencer Marketing Platform for company & agency | ClanConnect - Influencers',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/influencers',
  },
  openGraph: {
    title: 'Influencer Marketing Platform for company & agency | ClanConnect - Influencers',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/influencers',
    type: 'website',
  },
};

export default function InfluencersPage() {
  return <InfluencerContainer />;
}
