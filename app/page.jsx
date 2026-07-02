import HomeContainer from '@/components/pages/Home';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'Influencer Marketing Platform for company & agency | ClanConnect',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai',
  },
  openGraph: {
    title: 'Influencer Marketing Platform for company & agency | ClanConnect',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/homepage.jpg',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function HomePage() {
  return <HomeContainer />;
}
