import React from 'react';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface AuthButtonProps {
  type: 'signIn' | 'signUp' | 'signOut';
  onClick: () => void;
  className?: string; // Optional className prop
}

const AuthButton: React.FC<AuthButtonProps> = ({ type, onClick }) => {
  const { t } = useTranslation();

  const buttonData = {
    signIn: {
      label: t('buttons.signIn'),
      icon: <FaSignInAlt />,
    },
    signUp: {
      label: t('buttons.signUp'),
      icon: <FaUserPlus />,
    },
    signOut: {
      label: t('buttons.logout'), // Updated to match your JSON key
      icon: <FaSignOutAlt />,
    },
  };

  return (
    <button
      type="button" // Added type attribute
      className="flex items-center gap-1 p-2 text-xl rounded-l bg-[var(--button-color)] text-[var(--text-color)] hover:bg-[var(--button-hover-color)] transition-colors"
      onClick={onClick}
    >
      {buttonData[type].icon}
      {buttonData[type].label}
    </button>
  );
};

export default AuthButton;
