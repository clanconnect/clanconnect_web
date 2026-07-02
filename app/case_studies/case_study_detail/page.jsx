'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Compatibility stub: the case study detail page moved from the query-string URL
// (/case_studies/case_study_detail?case_study_detail_id=49) to a static path
// (/case_studies/case_study_detail/49). Static export cannot do server
// redirects, so this client stub forwards old/indexed links to the new path.
function CaseStudyDetailRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('case_study_detail_id');
    router.replace(id ? `/case_studies/case_study_detail/${id}` : '/case_studies');
  }, [router, searchParams]);

  return null;
}

export default function CaseStudyDetailRedirectPage() {
  return (
    <Suspense fallback={null}>
      <CaseStudyDetailRedirect />
    </Suspense>
  );
}
