"use client"
import { useState, useEffect } from 'react';

const themes = ['mint', 'pastel', 'dark', 'light'];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>('mint');

  // Ініціалізація теми при завантаженні
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'mint';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Функція для зміни теми
  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-white transition-colors duration-300"
    >
      {theme.charAt(0).toUpperCase() + theme.slice(1)}
    </button>
  );
};

export default ThemeSwitcher;
