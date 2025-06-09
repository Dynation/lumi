import { useState, useEffect } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface GeolocationHookResult {
  position: Coordinates | null;
  error: string | null;
  requestLocation: () => void;
}

export const useGeolocation = (initialPosition?: Coordinates): GeolocationHookResult => {
  const [position, setPosition] = useState<Coordinates | null>(initialPosition || null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        setPosition(coords);
        setError(null);
      },
      (err) => {
        setError(err.message);
        console.warn('Geolocation error:', err);
      }
    );
  };

  useEffect(() => {
    if (!initialPosition) {
      requestLocation();
    }
  }, [initialPosition]);

  return {
    position,
    error,
    requestLocation
  };
};