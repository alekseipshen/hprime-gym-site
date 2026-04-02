interface SchemaParams {
  city?: string;
  appliance?: string;
  brand?: string;
  county?: string;
}

const SITE_URL = 'https://www.hprime-gym.com';
const BUSINESS_NAME = 'H-Prime Gym Equipment Repair';
const PHONE = '+17207066650';
const PHONE_DISPLAY = '(720) 706-6650';
const GOOGLE_RATING = 4.9;
const REVIEW_COUNT = 47;

export function generateLocalBusinessSchema(params: SchemaParams) {
  const { city, appliance, brand, county } = params;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    description: generateBusinessDescription(params),
    url: SITE_URL,
    telephone: PHONE,
    priceRange: '$$',
    image: `${SITE_URL}/logo-original.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.toString(),
      reviewCount: REVIEW_COUNT.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    areaServed: generateAreaServed(params),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
  };

  return schema;
}

export function generateServiceSchema(params: SchemaParams) {
  const { city, appliance, brand } = params;

  const serviceName = generateServiceName(params);
  const serviceDescription = generateServiceDescription(params);

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      telephone: PHONE,
      url: SITE_URL,
    },
    areaServed: generateAreaServed(params),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceName} Services`,
      itemListElement: generateServiceList(params),
    },
  };

  return schema;
}

export function generateBreadcrumbSchema(params: SchemaParams) {
  const { city, appliance, brand } = params;

  const items: any[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  let position = 2;

  if (city) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: formatCityName(city),
      item: `${SITE_URL}/cities/${city}`,
    });
  }

  if (brand && !appliance) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatBrandName(brand)} Repair`,
      item: city
        ? `${SITE_URL}/cities/${city}/brands/${brand}-repair`
        : `${SITE_URL}/brands/${brand}-repair`,
    });
  }

  if (appliance && !brand) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatEquipmentName(appliance)} Repair`,
      item: city
        ? `${SITE_URL}/cities/${city}/services/${appliance}-repair`
        : `${SITE_URL}/services/${appliance}-repair`,
    });
  }

  if (brand && appliance) {
    items.push({
      '@type': 'ListItem',
      position: position++,
      name: `${formatBrandName(brand)} ${formatEquipmentName(appliance)} Repair`,
      item: city
        ? `${SITE_URL}/cities/${city}/brands/${brand}/services/${appliance}-repair`
        : `${SITE_URL}/brands/${brand}-repair/services/${appliance}-repair`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-original.jpg`,
    telephone: PHONE,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    sameAs: [],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}#organization`,
    },
  };
}

export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

// Helper functions

function generateBusinessDescription(params: SchemaParams): string {
  const { city, appliance, brand } = params;

  if (city && brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatEquipmentName(appliance)} repair in ${formatCityName(city)}, CO. Same-day service, certified technicians.`;
  } else if (city && appliance) {
    return `Expert ${formatEquipmentName(appliance)} repair in ${formatCityName(city)}, CO. Same-day service available.`;
  } else if (city) {
    return `Professional gym equipment repair services in ${formatCityName(city)}, CO. All major brands and equipment types. Same-day service.`;
  } else {
    return `Expert gym equipment repair in the Denver Metro area. Certified technicians, same-day service for treadmills, ellipticals, bikes & more.`;
  }
}

function generateServiceName(params: SchemaParams): string {
  const { city, appliance, brand } = params;

  if (brand && appliance) {
    return `${formatBrandName(brand)} ${formatEquipmentName(appliance)} Repair`;
  } else if (appliance) {
    return `${formatEquipmentName(appliance)} Repair`;
  } else if (brand) {
    return `${formatBrandName(brand)} Gym Equipment Repair`;
  } else {
    return 'Gym Equipment Repair';
  }
}

function generateServiceDescription(params: SchemaParams): string {
  const { city, appliance, brand } = params;

  if (city && brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatEquipmentName(appliance)} repair services in ${formatCityName(city)}, CO. Certified technicians, same-day service, upfront pricing.`;
  } else if (city && appliance) {
    return `Expert ${formatEquipmentName(appliance)} repair in ${formatCityName(city)}, CO. Certified technicians, same-day service, all major brands.`;
  } else if (brand && appliance) {
    return `Professional ${formatBrandName(brand)} ${formatEquipmentName(appliance)} repair in the Denver Metro area. Certified technicians.`;
  } else {
    return `Professional gym equipment repair services in the Denver Metro area. All major brands and equipment types. Same-day service available.`;
  }
}

function generateAreaServed(params: SchemaParams): any {
  const { city } = params;

  if (city) {
    return {
      '@type': 'City',
      name: formatCityName(city),
      containedInPlace: {
        '@type': 'State',
        name: 'Colorado',
        '@id': 'https://en.wikipedia.org/wiki/Colorado',
      },
    };
  } else {
    return {
      '@type': 'State',
      name: 'Colorado',
      '@id': 'https://en.wikipedia.org/wiki/Colorado',
    };
  }
}

function generateServiceList(params: SchemaParams): any[] {
  const { appliance } = params;

  if (appliance === 'treadmill') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Treadmill Belt Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Treadmill Motor Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Treadmill Console Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Treadmill Incline Repair' } },
    ];
  } else if (appliance === 'elliptical') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elliptical Resistance Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elliptical Console Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elliptical Stride Adjustment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elliptical Pedal Replacement' } },
    ];
  } else if (appliance === 'stationary-bike' || appliance === 'spin-bike') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bike Resistance Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bike Pedal Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bike Console Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bike Seat & Handlebar Adjustment' } },
    ];
  } else if (appliance === 'rowing-machine') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rowing Machine Chain Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rowing Machine Resistance Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rowing Machine Console Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rowing Machine Seat Rail Repair' } },
    ];
  } else if (appliance === 'stair-machine') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stair Machine Step Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stair Machine Motor Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stair Machine Console Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stair Machine Belt Replacement' } },
    ];
  } else if (appliance === 'weight-machine') {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cable & Pulley Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Weight Stack Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Upholstery Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Frame & Structural Repair' } },
    ];
  } else {
    return [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Equipment Diagnostic' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gym Equipment Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Preventive Maintenance' } },
    ];
  }
}

function formatCityName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatBrandName(slug: string): string {
  const brandMap: { [key: string]: string } = {
    'life-fitness': 'Life Fitness',
    'precor': 'Precor',
    'technogym': 'Technogym',
    'cybex': 'Cybex',
    'nautilus': 'Nautilus',
    'bowflex': 'Bowflex',
    'nordictrack': 'NordicTrack',
    'peloton': 'Peloton',
    'sole': 'Sole',
    'matrix': 'Matrix',
    'hammer-strength': 'Hammer Strength',
    'true-fitness': 'TRUE Fitness',
    'star-trac': 'Star Trac',
    'stairmaster': 'StairMaster',
    'concept2': 'Concept2',
    'rogue': 'Rogue',
    'schwinn': 'Schwinn',
    'proform': 'ProForm',
  };

  if (brandMap[slug]) return brandMap[slug];

  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatEquipmentName(slug: string): string {
  const equipmentMap: { [key: string]: string } = {
    'treadmill': 'Treadmill',
    'elliptical': 'Elliptical',
    'stationary-bike': 'Stationary Bike',
    'spin-bike': 'Spin Bike',
    'rowing-machine': 'Rowing Machine',
    'stair-machine': 'Stair Machine',
    'weight-machine': 'Weight Machine',
  };

  return equipmentMap[slug] || slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Keep backward-compatible alias
const formatApplianceName = formatEquipmentName;
