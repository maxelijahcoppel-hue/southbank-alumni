interface Coordinates {
  lat: number;
  lng: number;
}

interface CityEntry {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

/**
 * ~150 major world cities with lat/lng coordinates.
 * Used to geocode alumni locations for the map view.
 */
const CITIES: CityEntry[] = [
  // United Kingdom
  { city: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278 },
  { city: "Manchester", country: "United Kingdom", lat: 53.4808, lng: -2.2426 },
  { city: "Birmingham", country: "United Kingdom", lat: 52.4862, lng: -1.8904 },
  { city: "Edinburgh", country: "United Kingdom", lat: 55.9533, lng: -3.1883 },
  { city: "Glasgow", country: "United Kingdom", lat: 55.8642, lng: -4.2518 },
  { city: "Bristol", country: "United Kingdom", lat: 51.4545, lng: -2.5879 },
  { city: "Leeds", country: "United Kingdom", lat: 53.8008, lng: -1.5491 },
  { city: "Liverpool", country: "United Kingdom", lat: 53.4084, lng: -2.9916 },
  { city: "Oxford", country: "United Kingdom", lat: 51.752, lng: -1.2577 },
  { city: "Cambridge", country: "United Kingdom", lat: 52.2053, lng: 0.1218 },

  // United States
  { city: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
  { city: "Los Angeles", country: "United States", lat: 34.0522, lng: -118.2437 },
  { city: "Chicago", country: "United States", lat: 41.8781, lng: -87.6298 },
  { city: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194 },
  { city: "Boston", country: "United States", lat: 42.3601, lng: -71.0589 },
  { city: "Washington", country: "United States", lat: 38.9072, lng: -77.0369 },
  { city: "Seattle", country: "United States", lat: 47.6062, lng: -122.3321 },
  { city: "Austin", country: "United States", lat: 30.2672, lng: -97.7431 },
  { city: "Miami", country: "United States", lat: 25.7617, lng: -80.1918 },
  { city: "Denver", country: "United States", lat: 39.7392, lng: -104.9903 },
  { city: "Atlanta", country: "United States", lat: 33.749, lng: -84.388 },
  { city: "Philadelphia", country: "United States", lat: 39.9526, lng: -75.1652 },
  { city: "Houston", country: "United States", lat: 29.7604, lng: -95.3698 },
  { city: "Dallas", country: "United States", lat: 32.7767, lng: -96.797 },
  { city: "Nashville", country: "United States", lat: 36.1627, lng: -86.7816 },

  // Canada
  { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { city: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
  { city: "Montreal", country: "Canada", lat: 45.5017, lng: -73.5673 },

  // France
  { city: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
  { city: "Lyon", country: "France", lat: 45.764, lng: 4.8357 },
  { city: "Marseille", country: "France", lat: 43.2965, lng: 5.3698 },
  { city: "Nice", country: "France", lat: 43.7102, lng: 7.262 },

  // Germany
  { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { city: "Munich", country: "Germany", lat: 48.1351, lng: 11.582 },
  { city: "Frankfurt", country: "Germany", lat: 50.1109, lng: 8.6821 },
  { city: "Hamburg", country: "Germany", lat: 53.5511, lng: 9.9937 },

  // Spain
  { city: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  { city: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686 },

  // Italy
  { city: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { city: "Milan", country: "Italy", lat: 45.4642, lng: 9.19 },
  { city: "Florence", country: "Italy", lat: 43.7696, lng: 11.2558 },

  // Netherlands
  { city: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { city: "Rotterdam", country: "Netherlands", lat: 51.9244, lng: 4.4777 },

  // Belgium
  { city: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517 },

  // Switzerland
  { city: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 },
  { city: "Geneva", country: "Switzerland", lat: 46.2044, lng: 6.1432 },

  // Austria
  { city: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 },

  // Portugal
  { city: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393 },

  // Ireland
  { city: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603 },

  // Sweden
  { city: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },

  // Norway
  { city: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522 },

  // Denmark
  { city: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683 },

  // Finland
  { city: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 },

  // Poland
  { city: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122 },

  // Czech Republic
  { city: "Prague", country: "Czech Republic", lat: 50.0755, lng: 14.4378 },

  // Greece
  { city: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275 },

  // Turkey
  { city: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },

  // Russia
  { city: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },

  // Japan
  { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { city: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023 },
  { city: "Kyoto", country: "Japan", lat: 35.0116, lng: 135.7681 },

  // China
  { city: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
  { city: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
  { city: "Shenzhen", country: "China", lat: 22.5431, lng: 114.0579 },
  { city: "Guangzhou", country: "China", lat: 23.1291, lng: 113.2644 },
  { city: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 },

  // Hong Kong (as separate entry)
  { city: "Hong Kong", country: "Hong Kong", lat: 22.3193, lng: 114.1694 },

  // South Korea
  { city: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },

  // India
  { city: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { city: "Delhi", country: "India", lat: 28.7041, lng: 77.1025 },
  { city: "New Delhi", country: "India", lat: 28.6139, lng: 77.209 },
  { city: "Bangalore", country: "India", lat: 12.9716, lng: 77.5946 },
  { city: "Hyderabad", country: "India", lat: 17.385, lng: 78.4867 },
  { city: "Chennai", country: "India", lat: 13.0827, lng: 80.2707 },

  // Singapore
  { city: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },

  // Malaysia
  { city: "Kuala Lumpur", country: "Malaysia", lat: 3.139, lng: 101.6869 },

  // Thailand
  { city: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },

  // Vietnam
  { city: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297 },
  { city: "Hanoi", country: "Vietnam", lat: 21.0278, lng: 105.8342 },

  // Indonesia
  { city: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },

  // Philippines
  { city: "Manila", country: "Philippines", lat: 14.5995, lng: 120.9842 },

  // Taiwan
  { city: "Taipei", country: "Taiwan", lat: 25.033, lng: 121.5654 },

  // UAE
  { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lng: 55.2708 },
  { city: "Abu Dhabi", country: "United Arab Emirates", lat: 24.4539, lng: 54.3773 },

  // Saudi Arabia
  { city: "Riyadh", country: "Saudi Arabia", lat: 24.7136, lng: 46.6753 },

  // Israel
  { city: "Tel Aviv", country: "Israel", lat: 32.0853, lng: 34.7818 },

  // Qatar
  { city: "Doha", country: "Qatar", lat: 25.2854, lng: 51.531 },

  // Australia
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { city: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { city: "Brisbane", country: "Australia", lat: -27.4698, lng: 153.0251 },
  { city: "Perth", country: "Australia", lat: -31.9505, lng: 115.8605 },

  // New Zealand
  { city: "Auckland", country: "New Zealand", lat: -36.8485, lng: 174.7633 },
  { city: "Wellington", country: "New Zealand", lat: -41.2865, lng: 174.7762 },

  // South Africa
  { city: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { city: "Johannesburg", country: "South Africa", lat: -26.2041, lng: 28.0473 },

  // Nigeria
  { city: "Lagos", country: "Nigeria", lat: 6.5244, lng: 3.3792 },

  // Kenya
  { city: "Nairobi", country: "Kenya", lat: -1.2921, lng: 36.8219 },

  // Egypt
  { city: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },

  // Morocco
  { city: "Casablanca", country: "Morocco", lat: 33.5731, lng: -7.5898 },

  // Ghana
  { city: "Accra", country: "Ghana", lat: 5.6037, lng: -0.187 },

  // Tanzania
  { city: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lng: 39.2083 },

  // Ethiopia
  { city: "Addis Ababa", country: "Ethiopia", lat: 8.9806, lng: 38.7578 },

  // Rwanda
  { city: "Kigali", country: "Rwanda", lat: -1.9403, lng: 29.8739 },

  // Brazil
  { city: "Sao Paulo", country: "Brazil", lat: -23.5505, lng: -46.6333 },
  { city: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },

  // Argentina
  { city: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },

  // Mexico
  { city: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },

  // Colombia
  { city: "Bogota", country: "Colombia", lat: 4.711, lng: -74.0721 },
  { city: "Medellin", country: "Colombia", lat: 6.2442, lng: -75.5812 },

  // Chile
  { city: "Santiago", country: "Chile", lat: -33.4489, lng: -70.6693 },

  // Peru
  { city: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428 },

  // Costa Rica
  { city: "San Jose", country: "Costa Rica", lat: 9.9281, lng: -84.0907 },

  // Panama
  { city: "Panama City", country: "Panama", lat: 8.9824, lng: -79.5199 },

  // Uruguay
  { city: "Montevideo", country: "Uruguay", lat: -34.9011, lng: -56.1645 },

  // Hungary
  { city: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402 },

  // Romania
  { city: "Bucharest", country: "Romania", lat: 44.4268, lng: 26.1025 },

  // Croatia
  { city: "Zagreb", country: "Croatia", lat: 45.815, lng: 15.9819 },

  // Luxembourg
  { city: "Luxembourg City", country: "Luxembourg", lat: 49.6116, lng: 6.1319 },

  // Pakistan
  { city: "Karachi", country: "Pakistan", lat: 24.8607, lng: 67.0011 },

  // Bangladesh
  { city: "Dhaka", country: "Bangladesh", lat: 23.8103, lng: 90.4125 },

  // Sri Lanka
  { city: "Colombo", country: "Sri Lanka", lat: 6.9271, lng: 79.8612 },

  // Lebanon
  { city: "Beirut", country: "Lebanon", lat: 33.8938, lng: 35.5018 },

  // Jordan
  { city: "Amman", country: "Jordan", lat: 31.9454, lng: 35.9284 },

  // Bahrain
  { city: "Manama", country: "Bahrain", lat: 26.2285, lng: 50.5860 },

  // Kuwait
  { city: "Kuwait City", country: "Kuwait", lat: 29.3759, lng: 47.9774 },

  // Myanmar
  { city: "Yangon", country: "Myanmar", lat: 16.8661, lng: 96.1951 },

  // Cambodia
  { city: "Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282 },
];

/**
 * Approximate country centroids as a fallback when city is not found.
 */
const COUNTRY_CENTROIDS: Record<string, Coordinates> = {
  "United Kingdom": { lat: 55.3781, lng: -3.436 },
  "United States": { lat: 37.0902, lng: -95.7129 },
  Canada: { lat: 56.1304, lng: -106.3468 },
  France: { lat: 46.2276, lng: 2.2137 },
  Germany: { lat: 51.1657, lng: 10.4515 },
  Spain: { lat: 40.4637, lng: -3.7492 },
  Italy: { lat: 41.8719, lng: 12.5674 },
  Netherlands: { lat: 52.1326, lng: 5.2913 },
  Belgium: { lat: 50.8503, lng: 4.3517 },
  Switzerland: { lat: 46.8182, lng: 8.2275 },
  Austria: { lat: 47.5162, lng: 14.5501 },
  Portugal: { lat: 39.3999, lng: -8.2245 },
  Ireland: { lat: 53.1424, lng: -7.6921 },
  Sweden: { lat: 60.1282, lng: 18.6435 },
  Norway: { lat: 60.472, lng: 8.4689 },
  Denmark: { lat: 56.2639, lng: 9.5018 },
  Finland: { lat: 61.9241, lng: 25.7482 },
  Poland: { lat: 51.9194, lng: 19.1451 },
  "Czech Republic": { lat: 49.8175, lng: 15.473 },
  Greece: { lat: 39.0742, lng: 21.8243 },
  Turkey: { lat: 38.9637, lng: 35.2433 },
  Russia: { lat: 61.524, lng: 105.3188 },
  Japan: { lat: 36.2048, lng: 138.2529 },
  China: { lat: 35.8617, lng: 104.1954 },
  "Hong Kong": { lat: 22.3193, lng: 114.1694 },
  "South Korea": { lat: 35.9078, lng: 127.7669 },
  India: { lat: 20.5937, lng: 78.9629 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  Malaysia: { lat: 4.2105, lng: 101.9758 },
  Thailand: { lat: 15.87, lng: 100.9925 },
  Vietnam: { lat: 14.0583, lng: 108.2772 },
  Indonesia: { lat: -0.7893, lng: 113.9213 },
  Philippines: { lat: 12.8797, lng: 121.774 },
  Taiwan: { lat: 23.6978, lng: 120.9605 },
  "United Arab Emirates": { lat: 23.4241, lng: 53.8478 },
  "Saudi Arabia": { lat: 23.8859, lng: 45.0792 },
  Israel: { lat: 31.0461, lng: 34.8516 },
  Qatar: { lat: 25.3548, lng: 51.1839 },
  Australia: { lat: -25.2744, lng: 133.7751 },
  "New Zealand": { lat: -40.9006, lng: 174.886 },
  "South Africa": { lat: -30.5595, lng: 22.9375 },
  Nigeria: { lat: 9.082, lng: 8.6753 },
  Kenya: { lat: -0.0236, lng: 37.9062 },
  Egypt: { lat: 26.8206, lng: 30.8025 },
  Morocco: { lat: 31.7917, lng: -7.0926 },
  Ghana: { lat: 7.9465, lng: -1.0232 },
  Tanzania: { lat: -6.369, lng: 34.8888 },
  Ethiopia: { lat: 9.145, lng: 40.4897 },
  Rwanda: { lat: -1.9403, lng: 29.8739 },
  Brazil: { lat: -14.235, lng: -51.9253 },
  Argentina: { lat: -38.4161, lng: -63.6167 },
  Mexico: { lat: 23.6345, lng: -102.5528 },
  Colombia: { lat: 4.5709, lng: -74.2973 },
  Chile: { lat: -35.6751, lng: -71.543 },
  Peru: { lat: -9.19, lng: -75.0152 },
  "Costa Rica": { lat: 9.7489, lng: -83.7534 },
  Panama: { lat: 8.538, lng: -80.7821 },
  Uruguay: { lat: -32.5228, lng: -55.7658 },
  Hungary: { lat: 47.1625, lng: 19.5033 },
  Romania: { lat: 45.9432, lng: 24.9668 },
  Croatia: { lat: 45.1, lng: 15.2 },
  Luxembourg: { lat: 49.8153, lng: 6.1296 },
  Pakistan: { lat: 30.3753, lng: 69.3451 },
  Bangladesh: { lat: 23.685, lng: 90.3563 },
  "Sri Lanka": { lat: 7.8731, lng: 80.7718 },
  Lebanon: { lat: 33.8547, lng: 35.8623 },
  Jordan: { lat: 30.5852, lng: 36.2384 },
  Bahrain: { lat: 26.0667, lng: 50.5577 },
  Kuwait: { lat: 29.3117, lng: 47.4818 },
  Myanmar: { lat: 21.9162, lng: 95.956 },
  Cambodia: { lat: 12.5657, lng: 104.991 },
};

/**
 * Build a lookup map for fast city matching.
 * Key format: "city|country" in lowercase.
 */
const cityMap = new Map<string, Coordinates>();
for (const entry of CITIES) {
  const key = `${entry.city.toLowerCase()}|${entry.country.toLowerCase()}`;
  cityMap.set(key, { lat: entry.lat, lng: entry.lng });
}

/**
 * Also index by city name alone (first match wins) for cases
 * where the country might not match exactly.
 */
const cityOnlyMap = new Map<string, Coordinates>();
for (const entry of CITIES) {
  const key = entry.city.toLowerCase();
  if (!cityOnlyMap.has(key)) {
    cityOnlyMap.set(key, { lat: entry.lat, lng: entry.lng });
  }
}

/**
 * Look up coordinates for a city + country combination.
 *
 * Resolution order:
 * 1. Exact city + country match
 * 2. City name only match (first in list)
 * 3. Country centroid fallback
 * 4. null if nothing matches
 */
export function getCityCoordinates(
  city: string,
  country: string
): Coordinates | null {
  const cityLower = city.trim().toLowerCase();
  const countryLower = country.trim().toLowerCase();

  // 1. Exact city + country
  const exactKey = `${cityLower}|${countryLower}`;
  const exact = cityMap.get(exactKey);
  if (exact) return exact;

  // 2. City name only
  const cityOnly = cityOnlyMap.get(cityLower);
  if (cityOnly) return cityOnly;

  // 3. Country centroid — try exact match first, then case-insensitive search
  const centroid = COUNTRY_CENTROIDS[country];
  if (centroid) return centroid;

  for (const [key, value] of Object.entries(COUNTRY_CENTROIDS)) {
    if (key.toLowerCase() === countryLower) return value;
  }

  return null;
}

/** Get all available cities (useful for autocomplete) */
export function getAllCities(): CityEntry[] {
  return [...CITIES];
}

/** Get all country names that we have centroids for */
export function getAvailableCountries(): string[] {
  return Object.keys(COUNTRY_CENTROIDS).sort();
}
