import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // 실제 사용하시는 도메인으로 변경하세요.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsioo.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/combined-tax`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/qna`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
