import { RefundCancellation } from '@/components/pages/Policy';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Refund & Cancellation',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/refund_cancellation_policy',
  },
  openGraph: {
    title: 'ClanConnect - Refund & Cancellation',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/refund_cancellation_policy',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/cancellation-refund.png',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function RefundCancellationPage() {
  return <RefundCancellation />;
}
