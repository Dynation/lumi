"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";

import styles from "./MasterSwiper.module.css";
import "swiper/css";
import "swiper/css/pagination";
import MasterCard from "../MasterCard";
import SkeletonBlock from "../SkeletonBlock";

interface Master {
  name: string;
  location: string;
  services: string[];
  rating: number;
  imageUrl: string;
  phoneNumber: string;
}

interface Props {
  selectedService: string | null;
  onDetailsClick: (master: Master) => void;
  onMasterSwipe: (master: Master) => void;
}

const ALL_SERVICES = [
  "Haircut", "Manicure", "Pedicure", "Facial", "Makeup",
  "Massage", "Waxing", "Eyebrows", "Eyelashes", "Nails"
];

const generateRandomServices = () => {
  const shuffled = [...ALL_SERVICES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
};

const MasterSwiper: React.FC<Props> = ({ selectedService, onDetailsClick, onMasterSwipe }) => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMasters = async () => {
      const res = await fetch('https://randomuser.me/api/?gender=female&results=10&nat=ca');
      const data = await res.json();

      interface User {
        name: { first: string; last: string };
        location: { city: string; country: string };
        picture: { large: string };
        phone: string;
      }

      const mapped: Master[] = data.results.map((user: User) => ({
        name: `${user.name.first} ${user.name.last}`,
        location: `${user.location.city}, ${user.location.country}`,
        services: generateRandomServices(),
        rating: Math.floor(Math.random() * 5) + 1,
        imageUrl: user.picture.large,
        phoneNumber: user.phone,
      }));

      setMasters(mapped);
      setIsLoading(false);

    };

    fetchMasters();
  }, []);

  const filteredMasters = selectedService
    ? masters.filter((m) => m.services.includes(selectedService))
    : masters;

  const handleSlideChange = (swiper: SwiperType) => {
    const index = swiper.activeIndex;
    const master = filteredMasters[index];
    if (master) onMasterSwipe(master);
  };

  return (
    <div className="w-full py-4 px-2 ">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        onSlideChange={handleSlideChange}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{
          clickable: true,
          bulletClass: styles["custom-bullet"],
          bulletActiveClass: styles["custom-bullet-active"],
        }}
        modules={[Pagination]}
        className={styles.swiperContainer}
      >
{isLoading
  ? Array.from({ length: 3 }).map((_, idx) => (
      <SwiperSlide key={idx} className={styles.swiperSlide}>
        <SkeletonBlock height="h-60" width="w-full" className="rounded-xl" />
      </SwiperSlide>
    ))
  : filteredMasters.map((master, index) => (
      <SwiperSlide key={index} className={styles.swiperSlide}>
        <MasterCard
          name={master.name}
          location={master.location}
          services={master.services}
          rating={master.rating}
          imageUrl={master.imageUrl}
          phoneNumber={master.phoneNumber}
          onDetailsClick={() => onDetailsClick(master)}
          defaultImage="/avaholder.png"
          defaultName="Default Name"
          defaultLocation="Default Location"
          defaultServices={["Service A"]}
          defaultRating={0}
          defaultPhoneNumber="000-000-0000"
        />
      </SwiperSlide>
    ))}

      </Swiper>
    </div>
  );
};

export default MasterSwiper;
