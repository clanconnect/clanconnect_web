import OurBusinessModalBrands from '@/components/pages/OurBusinessModal/OurBusinessModalBrands';

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export function generateStaticParams() {
  return ['1', '2', '3', '4', '5'].map((param) => ({ param }));
}

export async function generateMetadata({ params }) {
  const { param } = await params;
  const canonicalUrl = `https://www.clanconnect.ai/our_business_models/${param}`;

  return {
    title: 'ClanConnect - Our Business Models',
    description: DESCRIPTION,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'ClanConnect - Our Business Models',
      description: DESCRIPTION,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/our-business-models.png',
          width: 1200,
          height: 627,
        },
      ],
    },
  };
}

export default function OurBusinessModelsPage() {
  return <OurBusinessModalBrands />;
}
