"use client";
import { useEffect } from "react";
import { MapPin, MapPinned } from "lucide-react";
import { useRadius } from "../../hooks/UseRadius";

export default function RadiusSliderHero({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const { radius, setRadius, radiusLabel, min, max, step } = useRadius(value);

  useEffect(() => {
    onChange(radius);
  }, [radius, onChange]);

  return (
    <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center px-2 py-4 ">
      <label htmlFor="radius-input" className="block text-sm font-medium text-white mb-1">
        Select search radius
      </label>
      <div className="flex items-center gap-3 w-full">
        <button
          title="Decrease radius"
          onClick={() => setRadius((prev) => Math.max(prev - step, min))}
          className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"
        >
          <MapPin className="text-xl" />
        </button>
        <input
          id="radius-input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full h-2 bg-yellow-400 rounded-lg appearance-none cursor-pointer"
        />
        <button
          title="Increase radius"
          onClick={() => setRadius((prev) => Math.min(prev + step, max))}
          className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"
        >
          <MapPinned className="text-xl" />
        </button>
      </div>
      <p className="text-gray-300 font-medium text-sm">Current radius: {radiusLabel}</p>
    </div>
  );
}