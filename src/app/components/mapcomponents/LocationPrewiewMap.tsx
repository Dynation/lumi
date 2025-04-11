"use client";

import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';



export default function LocationPreviewMap({ radius, onLocation }: { radius: number; onLocation: (pos: { lat: number; lng: number }) => void }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(coords);
        onLocation(coords);
      },
      (err) => {
        console.warn('Геолокація не дозволена або недоступна:', err);
      }
    );
  }, []);

  if (!position) return <div className="w-full h-[200px] bg-gray-800 text-center text-white flex items-center justify-center">Loading map...</div>;

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-[200px] rounded-lg overflow-hidden z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={position} />
      <Circle center={position} radius={radius * 1000} pathOptions={{ fillColor: 'blue', fillOpacity: 0.2, color: 'blue' }} />
    </MapContainer>
  );
}

