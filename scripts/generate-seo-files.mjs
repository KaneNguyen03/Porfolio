import fs from 'node:fs/promises';
import path from 'node:path';

const normalizeSiteUrl = (url) => url.replace(/\/+$/, '');

const getSiteUrl = () => {
  const explicit = process.env.VITE_SITE_URL || process.env.SITE_URL;
  if (explicit && explicit.trim()) return normalizeSiteUrl(explicit.trim());

  // Vercel provides the domain without protocol
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl && vercelUrl.trim()) return normalizeSiteUrl(`https://${vercelUrl.trim()}`);

  return null;
};

// Blog slugs are duplicated here since this plain Node script can't import
// the TSX-adjacent src/data/blog.en.ts data module. Keep in sync with the
// `slug` fields in src/data/blog.en.ts.
const blogSlugs = [
  'event-driven-aws-sqs-lambda',
  'typescript-utility-types',
  'rag-pipelines-langchain',
  'nestjs-grpc-microservices',
  'react-performance-optimization',
];

const routes = [
  '/',
  '/about',
  '/projects',
  '/experience',
  '/education',
  '/blog',
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  '/contact',
];

const today = () => new Date().toISOString().slice(0, 10);

const buildSitemapXml = (siteUrl) => {
  const lastmod = today();
  const urls = routes
    .map((route) => {
      const loc = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
      const priority = route === '/' ? '1.0' : '0.8';
      const changefreq = route === '/' ? 'weekly' : 'monthly';

      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${urls}\n\n</urlset>\n`;
};

const buildRobotsTxt = (siteUrl) => {
  return `User-agent: *\nAllow: /\n\nDisallow: /admin/\nDisallow: /private/\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
};

const run = async () => {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    // Keep existing files if we can’t confidently build absolute URLs.
    console.warn(
      '[generate-seo-files] Missing site URL. Set VITE_SITE_URL (recommended) or SITE_URL. ' +
        'On Vercel, VERCEL_URL is used automatically.'
    );
    return;
  }

  const publicDir = path.resolve(process.cwd(), 'public');
  await fs.mkdir(publicDir, { recursive: true });

  await Promise.all([
    fs.writeFile(path.join(publicDir, 'sitemap.xml'), buildSitemapXml(siteUrl), 'utf8'),
    fs.writeFile(path.join(publicDir, 'robots.txt'), buildRobotsTxt(siteUrl), 'utf8')
  ]);

  console.log(`[generate-seo-files] Wrote sitemap.xml and robots.txt for ${siteUrl}`);
};

run().catch((err) => {
  console.error('[generate-seo-files] Failed:', err);
  process.exitCode = 1;
});
