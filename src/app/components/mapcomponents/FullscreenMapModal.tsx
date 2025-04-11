"use client";

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
}

export default function FullscreenMapModal({
  lat,
  lng,
  radius,
  onClose,
  tooltip = false,
  editable = false,
  onLocation,
}: FullscreenMapModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col">
      {/* Верхня панель з повзунком і кнопкою закриття */}
      <div className="w-full flex justify-end p-4 z-[60] gap-2">
        <RadiusSliderHero value={radius} onChange={() => {}} />
        <button
          type="button"
          onClick={onClose}
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm"
        >
          Close
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
