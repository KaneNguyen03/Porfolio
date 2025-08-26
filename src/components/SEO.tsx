import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title = 'Kha (Kane) Nguyen - Software Engineer Portfolio',
  description = 'Fullstack Software Engineer specializing in React.js, Node.js, and modern web technologies. Based in Ho Chi Minh City, Vietnam.',
  keywords = 'software engineer, fullstack developer, react.js, node.js, typescript, vietnam, portfolio',
  image = 'https://your-portfolio-url.com/og-image.jpg',
  url = 'https://your-portfolio-url.com',
  type = 'website',
  author = 'Kha (Kane) Nguyen',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const fullTitle = title.includes('Kha (Kane) Nguyen') ? title : `${title} | Kha (Kane) Nguyen`;
  const fullKeywords = [...keywords.split(', '), ...tags].join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Kane Nguyen Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {author && <meta property="og:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@your_twitter_handle" />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Structured Data for Articles */}
      {type === 'article' && (
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": fullTitle,
          "description": description,
          "image": image,
          "author": {
            "@type": "Person",
            "name": author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Kane Nguyen Portfolio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://your-portfolio-url.com/logo.png"
            }
          },
          "datePublished": publishedTime,
          "dateModified": modifiedTime || publishedTime,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
