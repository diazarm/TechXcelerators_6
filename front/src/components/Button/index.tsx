import React from 'react';
import type { ButtonProps } from './types';

/** Componente Button reutilizable */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  iconLeft,
  iconRight,
}) => {
  // Clases base que se aplican a todos los botones
  const baseClasses = "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  // Clases específicas para cada variante
  const variantClasses = {
    primary: "bg-[#5D5A88] hover:bg-[#4A476F] text-white focus:ring-[#5D5A88] shadow-sm",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500 shadow-sm",
    outline: "border border-[#D4D2E3] text-[#5D5A88] hover:bg-gray-50 focus:ring-[#5D5A88] bg-white"
  };
  
  // Clases específicas para cada tamaño
  const sizeClasses = {
    sm: "px-6 py-[18px] text-sm rounded-[30px] w-[88px] h-[54px]",
    md: "px-6 py-[18px] text-base rounded-[30px] w-[94px] h-[54px]",
    lg: "px-8 py-4 text-lg rounded-[30px] w-[120px] h-[60px]"
  };

  // Clases para estado deshabilitado
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md";

  // Combinar todas las clases
  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      <span className="flex-1">{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
};
