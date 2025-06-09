"use client";

import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { RefObject } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useGeolocation } from '@/hooks/useGeolocation';

interface LocationPreviewMapProps {
  radius: number;
  onLocation: (pos: { lat: number; lng: number }) => void;
  position?: { lat: number; lng: number };
  mapRef?: RefObject<L.Map | null>;
}

export default function LocationPreviewMap({ 
  radius, 
  position: initialPosition, 
  mapRef 
}: LocationPreviewMapProps) {
  const { position, error } = useGeolocation(initialPosition);

  if (error) return (
    <div className="w-full h-[200px] bg-gray-800 text-center text-white flex items-center justify-center">
      Failed to load map: {error}
    </div>
  );

  if (!position) return (
    <div className="w-full h-[200px] bg-gray-800 text-center text-white flex items-center justify-center">
      Loading map...
    </div>
  );

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-[200px] rounded-lg overflow-hidden z-0"
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={position} />
      <Circle 
        center={position} 
        radius={radius * 1000} 
        pathOptions={{ fillColor: 'blue', fillOpacity: 0.2, color: 'blue' }} 
      />
    </MapContainer>
  );
}

