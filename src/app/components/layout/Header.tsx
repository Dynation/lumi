"use client";
import React from "react";

import AuthButton from "../../components/common/AuthButton";
import ThemeSwitcher from "../../components/ThemeSwitcher";
import LanguageSwitcher from "../../components/LanguageSwitcher";

const Header: React.FC = () => {
  return (
    <header className="w-full p-2 flex flex-col items-center bg-gradient-to-b from-(--button-color)  to-(--background-color) text-[var(--text-color)] shadow-md">
      {/* Лого окремим блоком зверху */}
      <div className="text-xl font-semibold mb-2">L.U.M.I.</div>

      {/* Кнопки на окремому рядку */}
      <div className="flex gap-2 justify-center w-full">
        <AuthButton type="signIn" onClick={() => alert("Sign In")} className="whitespace-nowrap" />
        <AuthButton type="signUp" onClick={() => alert("Sign Up")} className="whitespace-nowrap" />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
