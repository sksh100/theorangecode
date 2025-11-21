// components/ConnectionsData.ts

export type City = {
  name: string;
  lat: number;
  lon: number;
};

export const gulfCities: City[] = [
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Abu Dhabi", lat: 24.4539, lon: 54.3773 },
  { name: "Riyadh", lat: 24.7136, lon: 46.6753 },
  { name: "Jeddah", lat: 21.4858, lon: 39.1925 },
  { name: "Doha", lat: 25.2854, lon: 51.5310 },
  { name: "Manama", lat: 26.2235, lon: 50.5876 },
  { name: "Kuwait City", lat: 29.3759, lon: 47.9774 },
  { name: "Muscat", lat: 23.5880, lon: 58.3829 },
];

