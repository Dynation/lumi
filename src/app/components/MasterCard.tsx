import React from "react";
import { useTranslation } from "react-i18next";
import { FaStar, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Button from "../components/common/Button";

interface MasterCardProps {
  name: string;
  location: string;
  services: string[];
  rating: number;
  imageUrl: string;
  defaultImage: string;
  defaultName: string;
  defaultLocation: string;
  defaultServices: string[];
  defaultRating: number;
  defaultPhoneNumber: string;
  phoneNumber: string;
  onDetailsClick: () => void;
  onClick?: () => void; 
}

const defaultImage = "/avaholder.png";
const defaultName = "Unknown Master";
const defaultLocation = "Unknown Location";
const defaultServices = ["No services available"];
const defaultRating = 0;
const defaultPhoneNumber = "No contact";


const MasterCard: React.FC<MasterCardProps> = ({
  name = defaultName,
  location = defaultLocation,
  services = defaultServices,
  rating = defaultRating,
  imageUrl = defaultImage,
  phoneNumber = defaultPhoneNumber,
  onDetailsClick,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-4xl h-80 shadow-lg overflow-hidden bg-gradient-to-b from-[--button-color] to-[--background-color] text-[var(--text-color)] transition-transform duration-300 hover:scale-105">
      <Image
      src={imageUrl}
      alt={name}
      width={110}
      height={110}
      className="w-full h-32 object-contain"
      />
      <div className="p-4 text-center">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="flex items-center gap-1 text-sm">
        <FaMapMarkerAlt />
        <span>{location}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <FaPhone />
        <span>{phoneNumber}</span>
      </div>
      <div className="flex items-center mt-2">
        {Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          className={`${
          index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
        ))}
      </div>
      <div className="mt-2 text-sm">
        {t("master.services")}: {services.join(", ")}
      </div>
      <Button
        label={t("master.showLoadChart")}
        onClick={onDetailsClick}
        variant="primary"
        className="mt-4 w-full"
      />
      </div>
    </div>
  );
};

export default MasterCard;

