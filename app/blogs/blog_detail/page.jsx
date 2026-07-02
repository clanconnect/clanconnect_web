'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Compatibility stub: the blog detail page moved from the query-string URL
// (/blogs/blog_detail?blogId=1) to a static path (/blogs/blog_detail/1). Static
// export cannot do server redirects, so this client stub forwards old/indexed
// links to the new path.
function BlogDetailRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const blogId = searchParams.get('blogId');
    router.replace(blogId ? `/blogs/blog_detail/${blogId}` : '/blogs');
  }, [router, searchParams]);

  return null;
}

export default function BlogDetailRedirectPage() {
  return (
    <Suspense fallback={null}>
      <BlogDetailRedirect />
    </Suspense>
  );
}
