import React from 'react';

interface ArticleSchemaProps {
  title: string;
  description: string;
  topicId: string;
}

export function ArticleSchema({ title, description, topicId }: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "ML Academy",
      "url": "https://www.learnmlacademy.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ML Academy",
      "url": "https://www.learnmlacademy.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.learnmlacademy.com/ml_academy_logo.svg"
      }
    },
    "url": `https://www.learnmlacademy.com/learn/${topicId}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.learnmlacademy.com/learn/${topicId}`
    },
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "educationalUse": "self study",
    "learningResourceType": "tutorial",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ML Academy",
    "url": "https://www.learnmlacademy.com",
    "description": "Free machine learning tutorials covering Linear Regression, Decision Trees, Neural Networks, Deep Learning and more.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.learnmlacademy.com/learn/{search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ category, topic, topicId }: { category: string; topic: string; topicId: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.learnmlacademy.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category,
        "item": "https://www.learnmlacademy.com"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": topic,
        "item": `https://www.learnmlacademy.com/learn/${topicId}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
