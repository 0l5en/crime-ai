import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  image = 'https://detectivesgame.com/logo.svg',
  type = 'website',
  keywords 
}: SEOProps) => {
  const { currentLanguage } = useLanguage();
  const baseUrl = 'https://detectivesgame.com';
  const fullCanonical = `${baseUrl}${canonical}`;
  
  // Available languages for hreflang
  const languages = ['en', 'de', 'fr', 'it'];
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="DetectivesGame" />
      <meta property="og:locale" content={currentLanguage === 'en' ? 'en_US' : currentLanguage === 'de' ? 'de_DE' : currentLanguage === 'fr' ? 'fr_FR' : 'it_IT'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* hreflang Tags */}
      {languages.map(lang => (
        <link 
          key={lang}
          rel="alternate" 
          hrefLang={lang} 
          href={`${baseUrl}${canonical}?lang=${lang}`} 
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={fullCanonical} />
    </Helmet>
  );
};

export default SEO;
