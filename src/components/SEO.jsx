import { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    // 1. Forcefully change the title in the DOM
    document.title = `${title} | Studio OMM Srimayee`;

    // 2. Forcefully update or create the meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = description;
      document.head.appendChild(metaDescription);
    }

    // 3. Forcefully update or create the meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = keywords;
      document.head.appendChild(metaKeywords);
    }
  }, [title, description, keywords]);

  return null; // This component does not render any visible UI
}