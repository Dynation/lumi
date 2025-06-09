"use client";

import { MapContainer, TileLayer, Marker, Circle, Tooltip, useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';
import { useGeocoding } from '@/hooks/useGeocoding';

// 🧩 Типи пропсів, гнучко підлаштовані для різних сценаріїв
interface MapBaseProps {
  position: { lat: number; lng: number }; // початкова позиція
  radius: number;                         // радіус у кілометрах
  editable?: boolean;                     // чи можна рухати маркер
  tooltip?: boolean;                      // чи показувати тултіп з адресою
  onPositionChange?: (coords: { lat: number; lng: number }) => void; // зворотній зв'язок
}

// 🔁 Форсує оновлення розміру карти після монтування
const ForceResize = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize(); // оновлення розмірів карти
    }, 150);
  }, [map]);
  return null;
};

// 🌍 Основний компонент карти
export default function MapBase({
  position,
  radius,
  editable = false,
  tooltip = false,
  onPositionChange,
}: MapBaseProps) {
  const [location, setLocation] = useState(position);        // поточна позиція
  const markerRef = useRef<L.Marker>(null);                  // реф на маркер
  const { locationName, fetchAddress } = useGeocoding();

  // ⛳ Якщо активовано тултіп — робимо reverse геокодування
  useEffect(() => {
    if (tooltip) fetchAddress(location);
  }, [location, tooltip, fetchAddress]);

  // 🔄 Подія перетягування маркера
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      const newPos = marker.getLatLng();
      const coords = { lat: newPos.lat, lng: newPos.lng };
      setLocation(coords);
      if (onPositionChange) onPositionChange(coords);
      if (tooltip) fetchAddress(coords);
    }
  };

  return (
    <MapContainer
      center={location}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full relative z-0"
    >
      <ForceResize />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {/* 📍 Маркер з drag, якщо editable */}
      <Marker
        position={location}
        draggable={editable}
        ref={markerRef}
        eventHandlers={editable ? { dragend: handleDragEnd } : undefined}
      >
        {/* 💬 Тултіп з адресою */}
        {tooltip && locationName && (
          <Tooltip direction="top" offset={[0, -10]} permanent>
            {locationName}
          </Tooltip>
        )}
      </Marker>

      {/* 🔵 Коло радіусу */}
      <Circle
        center={location}
        radius={radius * 1000}
        pathOptions={{ fillColor: 'blue', fillOpacity: 0.2, color: 'blue' }}
      />
    </MapContainer>
  );
}
