import { notFound } from 'next/navigation';
import BlogsDetailContainer from '@/components/pages/BlogsDetail/Container';
import { blogsData } from '@/data/data';

const findBlogData = (blogId) => blogsData?.find((b) => Number(blogId) === b.id);

const DESCRIPTION =
  'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

// Pre-render one static page per blog. dynamicParams:false means any id that is
// not in this list is a 404 rather than an on-demand render (required for export).
export function generateStaticParams() {
  return (blogsData || []).map((b) => ({ blogId: String(b.id) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { blogId } = await params;
  const blogData = findBlogData(blogId);
  if (!blogData) {
    return { title: 'ClanConnect - Blogs' };
  }

  const canonicalUrl = `https://www.clanconnect.ai/blogs/blog_detail/${blogData.id}`;
  const title = `ClanConnect - ${blogData.newsTitle}`;
  const description = blogData.newsDescription || DESCRIPTION;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blogData.newsTitle || 'ClanConnect - Blogs',
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url:
            blogData.newsImage ||
            'https://clanconnect.s3.ap-south-1.amazonaws.com/static_images/web-clanconnect/blog.jpg',
          width: 1200,
          height: 627,
        },
      ],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { blogId } = await params;
  const blogData = findBlogData(blogId);
  if (!blogData) notFound();

  return <BlogsDetailContainer blogData={blogData} />;
}
