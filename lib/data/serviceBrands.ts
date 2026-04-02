// Mapping of gym equipment types to brands that manufacture them
export const applianceBrandMapping: Record<string, string[]> = {
  'treadmill': ['life-fitness', 'precor', 'nordictrack', 'peloton', 'matrix', 'cybex', 'technogym', 'sole', 'horizon', 'bowflex', 'proform', 'true-fitness', 'spirit', 'landice', 'freemotion', 'star-trac', 'assault-fitness', 'sunny-health', 'xterra', 'ironman'],
  'elliptical': ['life-fitness', 'precor', 'nordictrack', 'matrix', 'cybex', 'technogym', 'sole', 'horizon', 'bowflex', 'schwinn', 'proform', 'true-fitness', 'spirit', 'octane', 'freemotion', 'diamondback', 'sunny-health', 'xterra'],
  'stationary-bike': ['life-fitness', 'precor', 'matrix', 'cybex', 'technogym', 'schwinn', 'nautilus', 'bowflex', 'nordictrack', 'proform', 'true-fitness', 'spirit', 'diamondback', 'sunny-health', 'body-craft'],
  'spin-bike': ['peloton', 'keiser', 'schwinn', 'life-fitness', 'precor', 'matrix', 'technogym', 'echelon', 'nordictrack', 'assault-fitness', 'sunny-health', 'star-trac'],
  'rowing-machine': ['concept2', 'life-fitness', 'matrix', 'technogym', 'waterrower', 'hydrow', 'nordictrack', 'bowflex', 'spirit', 'true-fitness', 'sunny-health', 'xterra', 'octane'],
  'stair-machine': ['stairmaster', 'life-fitness', 'precor', 'matrix', 'cybex', 'technogym', 'spirit', 'true-fitness', 'nautilus', 'bowflex', 'nordictrack'],
  'weight-machine': ['life-fitness', 'precor', 'matrix', 'cybex', 'technogym', 'hammer-strength', 'body-solid', 'hoist', 'legend-fitness', 'powertec', 'nautilus', 'inspire', 'marcy', 'body-craft', 'rogue', 'titan-fitness', 'freemotion', 'star-trac', 'fitness-gear'],
};

// Get brands that manufacture a specific equipment type
export const getBrandsForAppliance = (applianceSlug: string): string[] => {
  return applianceBrandMapping[applianceSlug] || [];
};

// Get equipment types that a brand manufactures
export const getAppliancesForBrand = (brandSlug: string): string[] => {
  const appliances: string[] = [];
  for (const [appliance, brands] of Object.entries(applianceBrandMapping)) {
    if (brands.includes(brandSlug)) {
      appliances.push(appliance);
    }
  }
  return appliances;
};

// Check if a brand manufactures a specific equipment type
export const checkBrandApplianceMatch = (brandSlug: string, applianceSlug: string): boolean => {
  const brands = applianceBrandMapping[applianceSlug];
  return brands ? brands.includes(brandSlug) : false;
};
