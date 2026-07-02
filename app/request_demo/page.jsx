import RequestaDemo from '@/components/RequestaDemo';

const DESCRIPTION =
  'Request a demo of ClanConnect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Request a Demo',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/request_demo',
  },
  openGraph: {
    title: 'ClanConnect - Request a Demo',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/request_demo',
    type: 'website',
  },
};

export default function RequestDemoPage() {
  return <RequestaDemo />;
}
