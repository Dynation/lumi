"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


  

const services = [
    'Haircut',
    'Manicure',
    'Pedicure',
    'Facial',
    'common',
    'Massage',
    'Makeup'
];


interface Props {
    onServiceSelect: (service: string) => void;
  }
  
  const ServiceSwiper: React.FC<Props> = ({ onServiceSelect }) => {
    // ...
    return (
      <Swiper  spaceBetween={5} slidesPerView={3} className="swiper-services w-full">
        {services.map((service, index) => (
          <SwiperSlide key={index} onClick={() => onServiceSelect(service)} className="cursor-pointer">
            <div className="flex items-center justify-center h-16 bg-gradient-to-b from-(--button-color)  to-(--background-color rounded-lg">
            {service}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };
export default ServiceSwiper;
