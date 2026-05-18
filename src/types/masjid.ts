export interface Masjid {
  id: string;
  name: string;
  nameAr?: string;
  area: string;          // panchayat/town
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  imam?: string;
  established?: number;  // year
  imageUrl?: string;
  mapsUrl?: string;
  facilities?: string[];
  description?: string;
}

export interface MasjidWithDistance extends Masjid {
  distance?: number; // km
}
