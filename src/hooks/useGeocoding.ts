import { useState } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

export const useGeocoding = () => {
  const [locationName, setLocationName] = useState('');

  const fetchAddress = async (coords: Coordinates) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
      );
      const data = await res.json();
      if (data?.display_name) {
        setLocationName(data.display_name);
        return data.display_name;
      }
    } catch (err) {
      console.error('Failed to fetch address:', err);
    }
    return '';
  };

  return {
    locationName,
    fetchAddress,
  };
};