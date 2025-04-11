"use client";

import { MapContainer, TileLayer, Marker, Circle, Tooltip, useMap } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import L from 'leaflet';

// Типи пропсів, які ми хочемо мати гнучкими для будь-якої карти
interface MapBaseProps {
  position: { lat: number; lng: number };
  radius: number;
  editable?: boolean;
  tooltip?: boolean;
  onPositionChange?: (coords: { lat: number; lng: number }) => void;
}

// Компонент для примусової перерисовки Leaflet-карти після монтування
const ForceResize = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 150); // Чекаємо, поки DOM повністю відрендериться
  }, [map]);
  return null;
};

export default function MapBase({
  position,
  radius,
  editable = false,
  tooltip = false,
  onPositionChange,
}: MapBaseProps) {
  const [location, setLocation] = useState(position); // поточна позиція маркера
  const [locationName, setLocationName] = useState(''); // збережене ім'я міста/місця
  const markerRef = useRef<L.Marker>(null); // посилання на сам маркер

  // Якщо включено тултіп — ми запитуємо адресу за координатами
  useEffect(() => {
    if (tooltip) fetchAddress(location);
  }, [location, tooltip]);

  // Отримання адреси з nominatim
  const fetchAddress = async (coords: { lat: number; lng: number }) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`);
      const data = await res.json();
      if (data?.display_name) setLocationName(data.display_name);
    } catch (err) {
      console.error('Не вдалося отримати адресу', err);
    }
  };

  // Подія при завершенні перетягування маркера
  const handleDragEnd = () => {
    const marker = markerRef.current;
    if (marker) {
      const newPos = marker.getLatLng();
      const coords = { lat: newPos.lat, lng: newPos.lng };
      setLocation(coords);
      if (onPositionChange) onPositionChange(coords);
      fetchAddress(coords);
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

      {/* Маркер: draggable тільки якщо editable */}
      <Marker
        position={location}
        draggable={editable}
        ref={markerRef}
        eventHandlers={editable ? { dragend: handleDragEnd } : undefined}
      >
        {/* Постійний тултіп з адресою */}
        {tooltip && <Tooltip direction="top" offset={[0, -10]} permanent>{locationName}</Tooltip>}
      </Marker>

      {/* Коло радіусу в км */}
      <Circle
        center={location}
        radius={radius * 1000}
        pathOptions={{ fillColor: 'blue', fillOpacity: 0.2, color: 'blue' }}
      />
    </MapContainer>
  );
}
