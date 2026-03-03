import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 실제 사용하시는 도메인으로 변경하세요.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://newsioo.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'], // 필요에 따라 크롤링 거부 경로 추가
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
