import StaticNewsPage from '@/components/pages/News';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - News',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/news',
  },
  openGraph: {
    title: 'ClanConnect - News',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/news',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/in-news.jpg',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function NewsPage() {
  return <StaticNewsPage />;
}
