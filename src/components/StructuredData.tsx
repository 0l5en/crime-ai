import { Helmet } from 'react-helmet-async';
import { seoConfig } from '@/config/seo';

interface OrganizationSchemaProps {
  type?: 'organization' | 'breadcrumb' | 'faq';
  data?: any;
}

const StructuredData = ({ type = 'organization', data }: OrganizationSchemaProps) => {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": seoConfig.organization.name,
          "url": seoConfig.organization.url,
          "logo": seoConfig.organization.logo,
          "sameAs": [
            "https://twitter.com/detectivesgame",
            "https://facebook.com/detectivesgame"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "url": `${seoConfig.siteUrl}/contact`
          }
        };
      
      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data || []
        };
      
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data || []
        };
      
      default:
        return null;
    }
  };

  const schema = getSchema();
  
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
