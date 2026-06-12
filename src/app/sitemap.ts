import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://mirrow.kr',
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://mirrow.kr/my',
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ];
}
