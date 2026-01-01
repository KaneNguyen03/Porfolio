import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';

export type SEOProps = {
  title?: string;
  description?: string;
  imagePath?: string;
  noIndex?: boolean;
};

const normalizeSiteUrl = (url: string): string => url.replace(/\/+$/, '');

const joinUrl = (base: string, path: string): string => {
  const normalizedBase = normalizeSiteUrl(base);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const getSiteUrl = (): string | null => {
  const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  if (envUrl && envUrl.trim().length > 0) return normalizeSiteUrl(envUrl.trim());

  if (typeof window !== 'undefined' && window.location?.origin) {
    return normalizeSiteUrl(window.location.origin);
  }

  return null;
};

const getGithubHandle = (githubUrl: string | undefined): string | null => {
  if (!githubUrl) return null;
  try {
    const url = new URL(githubUrl);
    if (!/github\.com$/i.test(url.hostname)) return null;
    const parts = url.pathname.split('/').filter(Boolean);
    const handle = parts[0];
    return handle && handle.length > 0 ? handle : null;
  } catch {
    return null;
  }
};

const makeTitle = (pageTitle: string | undefined, name: string, handle?: string | null): string => {
  const suffix = handle ? `${name} (${handle})` : name;
  if (!pageTitle || pageTitle.trim().length === 0) {
    return `${suffix} - Software Engineer Portfolio`;
  }
  return `${pageTitle} | ${suffix}`;
};

const makeDescription = (pageDescription: string | undefined): string => {
  const fallback =
    'Software Engineer portfolio featuring projects, experience, education, and contact information.';
  if (!pageDescription || pageDescription.trim().length === 0) return fallback;
  return pageDescription;
};

const SEO: React.FC<SEOProps> = ({ title, description, imagePath = '/og-image.jpg', noIndex }) => {
  const location = useLocation();
  const { personalInfo } = portfolioData;
  const githubHandle = getGithubHandle(personalInfo.github);

  const siteUrl = getSiteUrl();
  const canonicalUrl = siteUrl ? joinUrl(siteUrl, location.pathname) : undefined;
  const absoluteImageUrl = siteUrl ? joinUrl(siteUrl, imagePath) : undefined;

  const fullTitle = makeTitle(title, personalInfo.name, githubHandle);
  const fullDescription = makeDescription(description);

  const keywords = [
    personalInfo.name,
    githubHandle,
    personalInfo.title,
    'Software Engineer',
    'Full-stack',
    'Backend',
    'Node.js',
    'TypeScript',
    'React',
    'AWS',
    'Portfolio'
  ]
    .filter(Boolean)
    .join(', ');

  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    alternateName: githubHandle ? [githubHandle] : undefined,
    jobTitle: personalInfo.title,
    description: fullDescription,
    url: siteUrl ?? undefined,
    sameAs: [personalInfo.github, personalInfo.linkedin].filter(Boolean),
    address: {
      '@type': 'PostalAddress',
      addressLocality: personalInfo.location,
      addressCountry: 'Vietnam'
    }
  };

  const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={personalInfo.name} />
      <meta name="robots" content={robotsContent} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {absoluteImageUrl && <meta property="og:image" content={absoluteImageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      {canonicalUrl && <meta name="twitter:url" content={canonicalUrl} />}
      {absoluteImageUrl && <meta name="twitter:image" content={absoluteImageUrl} />}

      <script type="application/ld+json">{JSON.stringify(jsonLdPerson)}</script>
    </Helmet>
  );
};

export default SEO;
