import { redirect } from 'next/navigation';
import BlogsDetailContainer from '@/components/pages/BlogsDetail/Container';
import { blogsData } from '@/data/data';

const findBlogData = (blogId) => blogsData?.find((b) => Number(blogId) === b.id);

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const blogData = findBlogData(params.blogId);
  if (!blogData) {
    return { title: 'ClanConnect - Blogs' };
  }

  const canonicalUrl = `https://www.clanconnect.ai/blogs/blog_detail?blogId=${blogData.id}`;
  const title = `ClanConnect - ${blogData.newsTitle}`;
  const description =
    blogData.newsDescription ||
    'Clan Connect - The Most Democratic Influencer Marketing Platform of the World. Collaborate with social media influencers.';

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

export default async function BlogDetailPage({ searchParams }) {
  const params = await searchParams;
  const blogData = findBlogData(params.blogId);
  if (!blogData) redirect('/blogs');

  return <BlogsDetailContainer blogData={blogData} />;
}
