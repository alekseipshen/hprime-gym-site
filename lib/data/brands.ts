// Top 20 most popular gym equipment brands in USA (featured on homepage)
export const FEATURED_BRANDS = [
  'life-fitness', 'precor', 'nordictrack', 'peloton', 'matrix',
  'cybex', 'technogym', 'sole', 'horizon', 'bowflex',
  'schwinn', 'nautilus', 'proform', 'stairmaster', 'concept2',
  'keiser', 'true-fitness', 'spirit', 'hammer-strength', 'body-solid'
];

export interface Brand {
  slug: string;
  name: string;
  logo?: string;
}

export const brands: Brand[] = [
  // Top 20 Featured Brands (most popular in USA)
  { slug: 'life-fitness', name: 'Life Fitness', logo: '/brands/life-fitness.jpg' },
  { slug: 'precor', name: 'Precor', logo: '/brands/precor.png' },
  { slug: 'nordictrack', name: 'NordicTrack', logo: '/brands/nordictrack.png' },
  { slug: 'peloton', name: 'Peloton', logo: '/brands/peloton.png' },
  { slug: 'matrix', name: 'Matrix', logo: '/brands/matrix.jpg' },
  { slug: 'cybex', name: 'Cybex', logo: '/brands/cybex.jpg' },
  { slug: 'technogym', name: 'Technogym', logo: '/brands/technogym.png' },
  { slug: 'sole', name: 'Sole', logo: '/brands/sole.webp' },
  { slug: 'horizon', name: 'Horizon', logo: '/brands/horizon.webp' },
  { slug: 'bowflex', name: 'Bowflex', logo: '/brands/bowflex.png' },
  { slug: 'schwinn', name: 'Schwinn', logo: '/brands/schwinn.png' },
  { slug: 'nautilus', name: 'Nautilus', logo: '/brands/nautilus.jpg' },
  { slug: 'proform', name: 'ProForm', logo: '/brands/proform.png' },
  { slug: 'stairmaster', name: 'StairMaster', logo: '/brands/stairmaster.webp' },
  { slug: 'concept2', name: 'Concept2', logo: '/brands/concept2.avif' },
  { slug: 'keiser', name: 'Keiser', logo: '/brands/keiser.png' },
  { slug: 'true-fitness', name: 'TRUE Fitness', logo: '/brands/true-fitness.png' },
  { slug: 'spirit', name: 'Spirit Fitness', logo: '/brands/spirit.png' },
  { slug: 'hammer-strength', name: 'Hammer Strength', logo: '/brands/hammer-strength.png' },
  { slug: 'body-solid', name: 'Body-Solid', logo: '/brands/body-solid.webp' },
  
  // Other brands (alphabetically)
  { slug: 'assault-fitness', name: 'Assault Fitness', logo: '/brands/assault-fitness.webp' },
  { slug: 'body-craft', name: 'BodyCraft', logo: '/brands/body-craft.png' },
  { slug: 'diamondback', name: 'Diamondback', logo: '/brands/diamondback.png' },
  { slug: 'echelon', name: 'Echelon', logo: '/brands/echelon.png' },
  { slug: 'fitness-gear', name: 'Fitness Gear' },
  { slug: 'freemotion', name: 'FreeMotion', logo: '/brands/freemotion.png' },
  { slug: 'hoist', name: 'Hoist', logo: '/brands/hoist.png' },
  { slug: 'hydrow', name: 'Hydrow', logo: '/brands/hydrow.png' },
  { slug: 'inspire', name: 'Inspire Fitness', logo: '/brands/inspire.jpg' },
  { slug: 'ironman', name: 'IRONMAN', logo: '/brands/ironman.png' },
  { slug: 'landice', name: 'Landice', logo: '/brands/landice.png' },
  { slug: 'legend-fitness', name: 'Legend Fitness', logo: '/brands/legend-fitness.png' },
  { slug: 'marcy', name: 'Marcy', logo: '/brands/marcy.png' },
  { slug: 'octane', name: 'Octane Fitness', logo: '/brands/octane.png' },
  { slug: 'powertec', name: 'Powertec', logo: '/brands/powertec.png' },
  { slug: 'rogue', name: 'Rogue Fitness', logo: '/brands/rogue.png' },
  { slug: 'star-trac', name: 'Star Trac', logo: '/brands/star-trac.png' },
  { slug: 'sunny-health', name: 'Sunny Health & Fitness', logo: '/brands/sunny-health.png' },
  { slug: 'titan-fitness', name: 'Titan Fitness', logo: '/brands/titan-fitness.png' },
  { slug: 'waterrower', name: 'WaterRower', logo: '/brands/waterrower.png' },
  { slug: 'xterra', name: 'XTERRA', logo: '/brands/xterra.jpg' },
];

export const getFeaturedBrands = () => brands.filter(b => FEATURED_BRANDS.includes(b.slug));
export const getOtherBrands = () => brands.filter(b => !FEATURED_BRANDS.includes(b.slug));
