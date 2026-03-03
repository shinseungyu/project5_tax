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
    // 다른 페이지가 있다면 여기에 추가
  ];
}
