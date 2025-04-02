"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n"; // Правильний шлях до файлу
 // Ensure i18n is initialized

const languages = ["en", "fr", "uk"];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation(); // Ensure i18n is used from the hook
  const [currentLang, setCurrentLang] = useState<string>(i18n.language);

  const toggleLanguage = () => {
    const nextIndex = (languages.indexOf(currentLang) + 1) % languages.length;
    const nextLang = languages[nextIndex];
    i18n.changeLanguage(nextLang);
    setCurrentLang(nextLang);
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case "en":
        return "🇺🇸";
      case "fr":
        return "🇫🇷";
      case "uk":
        return "🇺🇦";
      default:
        return "🌐";
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl transition duration-200 text-[var(--color-text)] bg-[var(--color-button)] hover:bg-[var(--color-button-hover)]"
    >
      {getLanguageLabel(currentLang)}
    </button>
  );
};

export default LanguageSwitcher;

// This component allows users to switch between different languages.
// It uses the `useTranslation` hook from the `react-i18next` library to manage language changes.
// The `languages` array contains the supported languages.