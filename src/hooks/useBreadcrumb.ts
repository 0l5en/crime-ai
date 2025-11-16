import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { seoConfig } from '@/config/seo';

export const useBreadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation('common');
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Homepage hat keine Breadcrumbs
  if (pathSegments.length === 0) {
    return null;
  }
  
  const breadcrumbList = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": seoConfig.siteUrl
    }
  ];
  
  // Map von Pfad-Segmenten zu lesbaren Namen
  const pathNameMap: Record<string, string> = {
    'cases': t('navigation.cases') || 'Cases',
    'venues': 'Venues',
    'affiliates': 'Affiliates',
    'partners': 'Partners',
    'faq': 'FAQ',
    'contact': t('navigation.contact') || 'Contact',
    'register': t('auth.register') || 'Register',
    'venue-register': 'Venue Registration',
    'profile': t('navigation.profile') || 'Profile',
    'terms': 'Terms & Conditions',
    'privacy': 'Privacy Policy',
    'cookies': 'Cookie Policy',
    'imprint': 'Imprint',
    'vacation-rental-dashboard': 'Dashboard',
    'admin': 'Admin'
  };
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbList.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      "item": `${seoConfig.siteUrl}${currentPath}`
    });
  });
  
  return breadcrumbList;
};
