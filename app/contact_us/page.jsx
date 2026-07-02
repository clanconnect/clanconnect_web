import ContactUs from '@/components/pages/ContactUs/ContactUs';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Contact Us',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/contact_us',
  },
  openGraph: {
    title: 'ClanConnect - Contact Us',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/contact_us',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/contact-us.png',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function ContactUsPage() {
  return <ContactUs />;
}
