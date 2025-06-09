"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import RadiusSliderHero from '../RadiusSliderHero';
import MapBase from './MapBase';

interface FullscreenMapModalProps {
  lat: number;
  lng: number;
  radius: number;
  onClose: () => void;
  tooltip?: boolean;
  editable?: boolean;
  onLocation?: (location: { lat: number; lng: number }) => void;
  onRadiusChange?: (radius: number) => void;
}

export default function FullscreenMapModal({
  lat,
  lng,
  radius: initialRadius,
  onClose,
  tooltip = false,
  editable = false,
  onLocation,
  onRadiusChange,
}: FullscreenMapModalProps) {
  const [radius, setRadius] = useState(initialRadius);

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    onRadiusChange?.(newRadius);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Верхня панель з повзунком і кнопкою закриття */}
      <div className="w-full flex justify-end p-4 z-[60] gap-2">
        <RadiusSliderHero value={radius} onChange={handleRadiusChange} />
        <button title='Закрити карту'
          type="button"
          onClick={onClose}
          className="px-2 py-2 my-auto rounded-xl text-sm"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Основна частина з картою */}
      <div className="flex-1">
        <MapBase
          position={{ lat, lng }}
          radius={radius}
          editable={editable}
          tooltip={tooltip}
          onPositionChange={onLocation}
        />
      </div>
    </div>
  );
}
