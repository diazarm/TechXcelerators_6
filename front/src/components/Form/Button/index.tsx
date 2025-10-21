import React from 'react';
import { useScreenSize } from '../../../context';
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
  style = {},
  iconLeft,
  iconRight,
}) => {
  const { dimensions, scale } = useScreenSize();
  // Clases base que se aplican a todos los botones
  const baseClasses = "font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  // Clases específicas para cada variante
  const variantClasses = {
    primary: `!bg-[#FF6E00] hover:shadow-lg !text-white focus:!ring-[#FF6E00] !border-[#FF6E00] shadow-sm hover:!bg-[#E55A00]`,
    secondary: `!border-[#FF6E00] !text-[#FF6E00] hover:!border-[#E55A00] hover:!text-[#E55A00] focus:!ring-[#FF6E00] !bg-white`,
    outline: `!border-[#FF6E00] !text-[#FF6E00] hover:!bg-[#FF6E00] hover:!text-white focus:!ring-[#FF6E00] !bg-white`
  };
  
  // Estilos responsivos para cada tamaño
  const sizeStyles = {
    xs: {
      paddingLeft: dimensions.spacing.md,
      paddingRight: dimensions.spacing.md,
      paddingTop: dimensions.spacing.xs,
      paddingBottom: dimensions.spacing.xs,
      fontSize: `${scale(12)}px`,
      borderRadius: `${scale(4)}px`,
      height: dimensions.button.height.xs,
      gap: '0px'
    },
    sm: {
      paddingLeft: dimensions.spacing.md,
      paddingRight: dimensions.spacing.md,
      paddingTop: dimensions.spacing.sm,
      paddingBottom: dimensions.spacing.sm,
      fontSize: `${scale(13)}px`,
      borderRadius: `${scale(6)}px`,
      height: dimensions.button.height.sm,
      gap: dimensions.spacing.xs
    },
    md: {
      paddingLeft: dimensions.spacing.md,
      paddingRight: dimensions.spacing.md,
      paddingTop: dimensions.spacing.sm,
      paddingBottom: dimensions.spacing.sm,
      fontSize: `${scale(14)}px`,
      borderRadius: `${scale(6)}px`,
      height: dimensions.button.height.md,
      gap: dimensions.spacing.xs
    },
    lg: {
      paddingLeft: dimensions.spacing.lg,
      paddingRight: dimensions.spacing.lg,
      paddingTop: dimensions.spacing.sm,
      paddingBottom: dimensions.spacing.sm,
      fontSize: `${scale(15)}px`,
      borderRadius: `${scale(6)}px`,
      height: dimensions.button.height.lg,
      gap: dimensions.spacing.xs
    }
  };

  // Clases base sin dimensiones fijas
  const sizeClasses = {
    xs: "",
    sm: "",
    md: "",
    lg: ""
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
      style={{
        ...sizeStyles[size],
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
      <span className={size === 'xs' ? 'flex-shrink-0' : 'flex-1'}>{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
};
