import React from 'react';
import { COLORS } from '../../constants';
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
  const baseClasses = "font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  // Clases específicas para cada variante
  const variantClasses = {
    primary: `!bg-[${COLORS.primary}] hover:shadow-lg !text-white focus:!ring-[${COLORS.primary}] !border-[${COLORS.primary}] shadow-sm`,
    secondary: `!border-[${COLORS.primary}] !text-[${COLORS.primary}] hover:!border-[${COLORS.primaryHover}] hover:!text-[${COLORS.primaryHover}] focus:!ring-[${COLORS.primary}] !bg-white`,
    outline: `!border-[${COLORS.primary}] !text-[${COLORS.primary}] hover:!bg-[${COLORS.primary}] hover:!text-white focus:!ring-[${COLORS.primary}] !bg-white`
  };
  
  // Clases específicas para cada tamaño
  const sizeClasses = {
    xs: "px-3 py-1.5 text-xs rounded-[8px] w-[107px] h-[30px] gap-0",
    sm: "px-6 py-[18px] text-sm rounded-[15px] w-[88px] h-[54px] gap-2",
    md: "px-6 py-[18px] text-base rounded-[15px] w-[94px] h-[54px] gap-2",
    lg: "px-8 py-4 text-lg rounded-[15px] w-[120px] h-[60px] gap-2"
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
      <span className={size === 'xs' ? 'flex-shrink-0' : 'flex-1'}>{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
};
