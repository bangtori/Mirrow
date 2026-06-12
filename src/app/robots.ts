import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: ['/', '/my'],
            disallow: ['/response/', '/result/', '/view/'],
        },
        sitemap: 'https://mirrow.kr/sitemap.xml',
    };
}
