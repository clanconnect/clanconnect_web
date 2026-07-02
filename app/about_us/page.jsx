import AboutContainer from '@/components/pages/About';

const DESCRIPTION =
  'ClanConnect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'Influencer Marketing Platform for company & agency | ClanConnect - About Us',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/about_us',
  },
  openGraph: {
    title: 'Influencer Marketing Platform for company & agency | ClanConnect - About Us',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/about_us',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/about.png',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function AboutUsPage() {
  return <AboutContainer />;
}
