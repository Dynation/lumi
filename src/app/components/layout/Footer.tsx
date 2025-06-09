"use client";
import React from 'react';
import { FaHome, FaCalendar, FaUser, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 z-50 w-full opacity-70 bg-gradient-to-t from-(--button-color)  to-(--background-color) text-[var(--text-color)] shadow-inner p-2">
      <div className="flex justify-around items-center">
      <Link href="/" className="flex flex-col items-center justify-center">
        <FaHome size={24} />
        <span className="text-xs">{t('home')}</span>
      </Link>
      <Link href="/calendar" className="flex flex-col items-center justify-center">
        <FaCalendar size={24} />
        <span className="text-xs">{t('calendar')}</span>
      </Link>
      <Link href="/finder" className="flex flex-col items-center justify-center">
        <FaSearch size={24} />
        <span className="text-xs">{t('buttons.search')}</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center justify-center">
        <FaUser size={24} />
        <span className="text-xs">{t('buttons.profile')}</span>
      </Link>
      </div>
    </nav>
  );
};

export default Footer;
