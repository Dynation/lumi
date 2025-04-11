"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SkeletonBlock from "../SkeletonBlock";

const FAKE_DELAY = 800;

const defaultServices = [
  "all services",
  "Haircut",
  "Manicure",
  "Pedicure",
  "Facial",
  "Massage",
  "Makeup",
  "Waxing",
  "Hair Coloring",
  "Nail Art",
  "tatoo"
];

interface Props {
  onServiceSelect: (service: string) => void;
}

const ServiceSwiper: React.FC<Props> = ({ onServiceSelect }) => {
  const [services, setServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляція затримки завантаження сервісів
    setTimeout(() => {
      setServices(defaultServices);
      setLoading(false);
    }, FAKE_DELAY);
  }, []);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      breakpoints={{
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
      }}
      className="swiper-services w-full"
    >
      {loading
        ? Array.from({ length: 5 }).map((_, idx) => (
            <SwiperSlide key={idx}>
              <SkeletonBlock
                height="h-16"
                className="rounded-lg w-full"
              />
            </SwiperSlide>
          ))
        : services.map((service, index) => (
            <SwiperSlide
              key={index}
              onClick={() => onServiceSelect(service)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-center h-16 rounded-lg text-sm font-medium transition-all bg-gradient-to-b from-[var(--grad-start)] via-[var(--background-color)] to-[var(--grad-end)] hover:scale-105 hover:shadow">
                {service}
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default ServiceSwiper;
