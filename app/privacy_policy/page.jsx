import { PrivacyPolicy } from '@/components/pages/Policy';

const DESCRIPTION = "Read ClanConnect's Privacy Policy to understand how we handle your data.";

export const metadata = {
  title: 'ClanConnect - Privacy Policy',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/privacy_policy',
  },
  openGraph: {
    title: 'ClanConnect - Privacy Policy',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/privacy_policy',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/privacy-policy.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  other: {
    'fb:app_id': '947505124185693',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
