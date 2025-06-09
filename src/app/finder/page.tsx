"use client";

import { useEffect, useState, useRef } from 'react';
import ServiceSwiper from '@/app/components/swipers/ServiceSwiper';
import RadiusSlider from '@/app/components/RadiusSliderHero';
import MasterSearchByPhone from '../components/MasterSearchByPhone';
import dynamic from 'next/dynamic';
import { Map } from 'leaflet';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// 👉 Наш Zustand store
import { useFinderStore } from '../../store/FinderSore';

// 👉 Ці компоненти не рендеряться на сервері (динамічний імпорт)
const LocationPreviewMap = dynamic(() => import('@/app/components/mapcomponents/LocationPrewiewMap'), { ssr: false });
const FullscreenMapModal = dynamic(() => import('@/app/components/mapcomponents/FullscreenMapModal'), { ssr: false });

export default function FinderPage() {
  // ⚙️ Підключаємо Zustand-сховище (стани)
  const service = useFinderStore((s) => s.service);
  const radius = useFinderStore((s) => s.radius);
  const location = useFinderStore((s) => s.location);

  const setService = useFinderStore((s) => s.setService);
  const setRadius = useFinderStore((s) => s.setRadius);
  const setLocation = useFinderStore((s) => s.setLocation);

  // 🔁 Місцеві стани тільки для внутрішньої логіки компонента
  const [showFullMap, setShowFullMap] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);

  const mapRef = useRef<Map | null>(null);
  const router = useRouter(); // для переходу до /results

  // 📍 Тип для результатів з nominatim API
  interface NominatimResult {
    lat: string;
    lon: string;
    display_name: string;
  }

  // 🧭 Спроба отримати геолокацію при першому завантаженні
  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(coords);
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
  }, [location, setLocation]);

  // 🔍 Автодоповнення по запиту (тільки якщо геолокація не спрацювала)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!locationError || query.length < 3) return setSuggestions([]);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching location suggestions:", err);
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query, locationError]);

  // 📌 Коли юзер вибирає адресу з підказки
  const handleSelectSuggestion = (sugg: NominatimResult) => {
    const coords = { lat: parseFloat(sugg.lat), lng: parseFloat(sugg.lon) };
    setQuery(sugg.display_name);
    setSuggestions([]);
    setLocation(coords);
    mapRef.current?.flyTo?.([coords.lat, coords.lng], 13, { animate: true });
    toast.success("Location set to: " + sugg.display_name);
  };

  // ✅ Переходимо до сторінки з результатами, якщо все вибрано
  const handleContinue = () => {
    if (service && radius && location) {
      router.push('/results'); // ← використовуємо Next Router
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[100dvh] px-4 py-6 text-white bg-[var(--background-color)]">
      <div className="w-full space-y-6">
        <h1 className="text-center text-2xl text-[var(--text-color)] font-bold">Welcome to LUMI</h1>
        <p className="text-center text-sm text-[var(--text-color)]">Find your perfect master in just a few steps</p>

        {/* 👩‍🎨 Вибір послуги */}
        <div className="pt-4">
          <p className="mb-2 text-[var(--text-color)] font-medium">Choose your service</p>
          <ServiceSwiper onServiceSelect={setService} />
        </div>

        {/* 📏 Повзунок радіусу */}
        <div className="pt-4">
          <RadiusSlider value={radius} onChange={setRadius} />
        </div>

        {/* 🛑 Якщо немає геолокації — даємо ручний інпут */}
        {locationError && (
          <div className="pt-2 relative">
            <p className="text-sm text-red-300 mb-2">Geolocation unavailable, please enter your location manually:</p>
            <input
              type="text"
              placeholder="Enter your address or city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-md text-[var(--text-color)] placeholder:text-gray-500"
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

        {/* ✅ Кнопка для переходу до результатів */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!service || !location}
          className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
            !service || !location
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }`}
        >
          Continue
        </button>

        {/* 🗺️ Превʼю-карта + кнопка розширення */}
        <div className="pt-4">
          <LocationPreviewMap
            radius={radius}
            onLocation={(pos) => setLocation(pos)}
            position={location || undefined}
            mapRef={mapRef}
          />
          <button
            type="button"
            onClick={() => setShowFullMap(true)}
            className="text-sm text-blue-400 underline mt-2 hover:text-blue-300"
          >
            Show full map
          </button>
        </div>
      </div>

      {/* 🧭 Повноекранна карта */}
      {showFullMap && location && (
        <FullscreenMapModal
          lat={location.lat}
          lng={location.lng}
          radius={radius}
          onClose={() => setShowFullMap(false)}
          tooltip
          editable
          onLocation={setLocation}
          onRadiusChange={setRadius}
        />
      )}

      {/* 🔍 Пошук майстра по телефону */}
      <MasterSearchByPhone
        onNotFound={(phone) => {
          console.log('Не знайдено, запропонуємо запросити:', phone);
        }}
        onFound={(master) => {
          console.log('Знайдено майстра:', master);
        }}
      />

      {/* Плейсхолдер для футера */}
      <div className="absolute bottom-0 h-[10dvh] w-[100vw] left-0 right-0 text-center text-lg text-gray-500 p-4"></div>
      pusher
    </div>
  );
}
