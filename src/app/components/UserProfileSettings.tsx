"use client";

import React, { useState } from "react";
import Image from "next/image";
//import { useTranslation } from "react-i18next";
import {Slider} from "@heroui/slider";// Create a custom Range component
//import { useLoading } from "@/context/LoadingContext";

const UserProfileSettings = () => {
  const [name, setName] = useState("Olena B.");
  const [phone, setPhone] = useState("+1 (514) 000-0000");
  const [locationType, setLocationType] = useState<"current" | "manual">("current");
  const [manualLocation, setManualLocation] = useState("");
 
 
  //const { t } = useTranslation();
  //const { isLoading } = useLoading();

  return (
    <div className="flex flex-col gap-6">
      {/* Аватар і імʼя */}
      <div className="flex gap-4 items-center">
        <Image
          src="/avaholder.png"
          alt="avatar"
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-b outline-none"
            placeholder="Enter your name"
            title="Name input field"
          />
          <p className="text-sm opacity-60">Email: you@gmail.com</p>
        </div>
      </div>

      {/* Телефон */}
      <div>
        <label className="text-sm">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded px-2 py-1"
          title="Phone number input field"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Геолокація + радіус */}
      <div>
        <label className="text-sm">Search area</label>
        <div className="flex gap-4 mb-2">
          <button
            className={`px-3 py-1 rounded ${locationType === "current" ? "bg-blue-500 text-white" : "border"}`}
            onClick={() => setLocationType("current")}
          >
            Current
          </button>
          <button
            className={`px-3 py-1 rounded ${locationType === "manual" ? "bg-blue-500 text-white" : "border"}`}
            onClick={() => setLocationType("manual")}
          >
            Manual
          </button>
        </div>
        {locationType === "manual" && (
          <input
            type="text"
            value={manualLocation}
            onChange={(e) => setManualLocation(e.target.value)}
            placeholder="City, Address..."
            className="w-full border rounded px-2 py-1 mb-2"
          />
        )}

        <div className="mt-2">
          <label className="text-sm">Radius: km</label>
    <Slider
    classNames={{
      base: "max-w-md",
      filler: "bg-gradient-to-r from-red-500 to-blue-400",
      labelWrapper: "mb-2",
      label: "font-medium text-default-700 text-medium",
      value: "font-medium text-default-500 text-small",
      thumb: [
        "transition-size",
        "bg-gradient-to-r from-secondary-400 to-primary-500",
        "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
        "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
      ],
      step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
    }}
    defaultValue={[0, 800]}
    disableThumbScale={true}
    formatOptions={{style: "currency", currency: "USD"}}
    label="Price Range"
    maxValue={1000}
    minValue={0}
    showOutline={true}
    showSteps={true}
    showTooltip={true}
    step={100}
    tooltipProps={{
      offset: 10,
      placement: "bottom",
      classNames: {
        base: [
          // arrow color
          "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
        ],
        content: [
          "py-2 shadow-xl",
          "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
        ],
      },
    }}
    tooltipValueFormatOptions={{style: "currency", currency: "USD", maximumFractionDigits: 0}}
  />
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;
