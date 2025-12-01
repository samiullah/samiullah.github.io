import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getAdminSettings } from '../services/storageService';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({ title, description, type = 'website' }) => {
  const settings = getAdminSettings();
  const siteTitle = "Samiullah | SDET & Playwright Expert";
  const fullTitle = title === "Home" ? siteTitle : `${title} | Samiullah.dev`;

  return (
    <Helmet>
      {/* Basic Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
      {/* Google Site Verification (if set by admin) */}
      {settings.googleSiteVerification && (
        <meta name="google-site-verification" content={settings.googleSiteVerification} />
      )}
    </Helmet>
  );
};

export default SEO;