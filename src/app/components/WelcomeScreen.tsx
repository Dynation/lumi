"use client";

import { useEffect, useState, useRef } from 'react';
import ServiceSwiper from '@/app/components/swipers/ServiceSwiper';
import RadiusSlider from './RadiusSliderHero';
import dynamic from 'next/dynamic';
import { toast } from 'sonner';

const LocationPreviewMap = dynamic(() => import('@/app/components/mapcomponents/LocationPrewiewMap'), { ssr: false });
const FullscreenMapModal = dynamic(() => import('@/app/components/mapcomponents/FullscreenMapModal'), { ssr: false });

export default function WelcomeScreen({
  onSubmit,
}: {
  onSubmit: (data: { service: string; radius: number; location: { lat: number; lng: number } }) => void;
}) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedRadius, setSelectedRadius] = useState<number>(5);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showFullMap, setShowFullMap] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('');
  const [locationError, setLocationError] = useState<boolean>(false);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!userLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(coords);
          setQuery('');
          toast.success("Location detected successfully");
        },
        (error) => {
          console.warn("Geolocation error:", error);
          setLocationError(true);
          toast.error("Unable to get your location. Please enter it manually.");
        }
      );
    }
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!locationError || query.length < 3) return setSuggestions([]);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.warn("Autocomplete failed", err);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query, locationError]);

  const handleSelectSuggestion = (sugg: any) => {
    const coords = { lat: parseFloat(sugg.lat), lng: parseFloat(sugg.lon) };
    setQuery(sugg.display_name);
    setSuggestions([]);
    setUserLocation(coords);
    if (mapRef.current?.flyTo) {
      mapRef.current.flyTo([coords.lat, coords.lng], 13, { animate: true });
    }
    toast.success("Location set to: " + sugg.display_name);
  };

  const handleContinue = () => {
    if (selectedService && selectedRadius && userLocation) {
      onSubmit({ service: selectedService, radius: selectedRadius, location: userLocation });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[100dvh] px-4 py-6 text-white bg-[var(--background-color)]">
      <div className="w-full space-y-6">
        <h1 className="text-center text-2xl font-bold">Welcome to LUMI</h1>
        <p className="text-center text-sm text-gray-400">Find your perfect master in just a few steps</p>

        {/* Вибір послуги */}
        <div className="pt-4">
          <p className="mb-2 font-medium">Choose your service</p>
          <ServiceSwiper onServiceSelect={setSelectedService} />
        </div>

        {/* Повзунок радіусу */}
        <div className="pt-4">
          <RadiusSlider value={selectedRadius} onChange={setSelectedRadius} />
        </div>

        {/* Повідомлення про помилку геолокації та поле ручного введення */}
        {locationError && (  
          <div className="pt-2 relative">
            <p className="text-sm text-red-300 mb-2">Geolocation unavailable, please enter your location manually:</p>
            <input
              type="text"
              placeholder="Enter your address or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-black placeholder:text-gray-500"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white text-black border border-gray-300 rounded-md shadow-md z-10 max-h-48 overflow-auto">
                {suggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelectSuggestion(s)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Кнопка підтвердження */}
        <button
          onClick={handleContinue}
          disabled={!selectedService || !userLocation}
          className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
            !selectedService || !userLocation
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}
        >
          Continue
        </button>

        {/* Мапа-превʼю та кнопка фулскріну */}
        <div className="pt-4">
          <LocationPreviewMap
            radius={selectedRadius}
            onLocation={setUserLocation}
            position={userLocation || undefined}
            mapRef={mapRef}
          />
          <button
            onClick={() => setShowFullMap(true)}
            className="text-sm text-blue-400 underline mt-2 hover:text-blue-300"
          >
            Show full map
          </button>
        </div>
      </div>

      {/* Фулскрін карта */}
      {showFullMap && userLocation && (
        <FullscreenMapModal
          lat={userLocation.lat}
          lng={userLocation.lng}
          radius={selectedRadius}
          onClose={() => setShowFullMap(false)}
          tooltip
          editable
          onLocation={setUserLocation}
        />
      )}
      <div className="absolute bottom-0 h-[10dvh] w-[100vw] left-0 right-0 text-center text-lg text-gray-500 p-4"></div>
      pusher
    </div>
  );
}
