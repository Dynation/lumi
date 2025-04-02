import React from 'react';

export interface ButtonProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
    className?: string;
}

const buttonStyles = {
  base: 'rounded-full font-medium focus:outline-none transition-colors duration-300 flex items-center gap-2',
  sizes: {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  },
  variants: {
    primary: 'bg-[var(--button-color)] text-[var(--text-color)] hover:bg-[var(--button-hover-color)]',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  },
  disabled: 'opacity-50 cursor-not-allowed',
};

const Button: React.FC<ButtonProps> = ({ label, onClick, icon, variant = 'primary', size = 'medium', disabled = false }) => {
  const classes = `
    ${buttonStyles.base}
    ${buttonStyles.sizes[size]}
    ${buttonStyles.variants[variant]}
    ${disabled ? buttonStyles.disabled : ''}
  `;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
