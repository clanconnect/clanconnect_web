import FaqContainer from '@/components/pages/Faq/Faq';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Faqs',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/faqs',
  },
  openGraph: {
    title: 'ClanConnect - Faqs',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/faqs',
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

export default function FaqsPage() {
  return <FaqContainer />;
}
