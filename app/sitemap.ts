import type { MetadataRoute } from "next";
import { blogsData, caseStudyDetailData } from "@/data/data";

const BASE_URL = "https://www.clanconnect.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about_us`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/influencers`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/brands`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/case_studies`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blogs`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/faqs`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/request_demo`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact_us`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/terms_condition`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy_policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/pricing_policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${BASE_URL}/refund_cancellation_policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const businessModelRoutes: MetadataRoute.Sitemap = ["1", "2", "3", "4", "5"].map((param) => ({
    url: `${BASE_URL}/our_business_models/${param}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = (blogsData || []).map((blog: any) => ({
    url: `${BASE_URL}/blogs/blog_detail?blogId=${blog.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = (caseStudyDetailData || []).map(
    (caseStudy: any) => ({
      url: `${BASE_URL}/case_studies/case_study_detail?case_study_detail_id=${caseStudy.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...businessModelRoutes, ...blogRoutes, ...caseStudyRoutes];
}
