import StaticBlogPage from '@/components/pages/Blogs';

const DESCRIPTION =
  'ClanConnect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

export const metadata = {
  title: 'ClanConnect - Blogs',
  description: DESCRIPTION,
  alternates: {
    canonical: 'https://www.clanconnect.ai/blogs',
  },
  openGraph: {
    title: 'ClanConnect - Blogs',
    description: DESCRIPTION,
    url: 'https://www.clanconnect.ai/blogs',
    type: 'website',
    images: [
      {
        url: 'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/blog.jpg',
        width: 1200,
        height: 627,
      },
    ],
  },
};

export default function BlogsPage() {
  return <StaticBlogPage />;
}
