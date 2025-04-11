"use client";
import React from "react";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const Header: React.FC = () => {
  return (
    <header className="w-full px-10 flex flex-col items-center bg-gradient-to-b from-(--button-color)  to-(--background-color) text-[var(--text-color)] ">
       <div className="flex gap-2 justify-between w-full">{/* Лого окремим блоком зверху */}  <div className="flex items-start"><LanguageSwitcher /></div>
      <div className="text-xl font-semibold mb-2">L.U.M.I.</div>
      <div className="flex items-end"><ThemeSwitcher /></div>
      {/* Кнопки на окремому рядку */}
     
       
      
        
      </div>
    </header>
  );
};

export default Header;
