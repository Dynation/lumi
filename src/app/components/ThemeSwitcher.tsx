import { useState, useEffect } from 'react';
import { SwatchIcon } from '@heroicons/react/24/outline';

const themes = ['mint', 'pastel', 'dark', 'light', 'blue', 'blue2', 'purple', 'orange'];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>('mint');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'mint';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-[var(--button-color)] transition"
      title={`Theme: ${theme}`}
    >
      <SwatchIcon className="w-6 h-6 text-[var()]" />
    </button>
  );
};

export default ThemeSwitcher;
