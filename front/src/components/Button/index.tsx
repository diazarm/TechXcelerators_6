import React from 'react';

/**
 * Props del componente Button
 */
interface ButtonProps {
  /** Contenido del botón */
  children: React.ReactNode;
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Tamaño del botón */
  size?: 'sm' | 'md' | 'lg';
  /** Función que se ejecuta al hacer click */
  onClick?: () => void;
  /** Si el botón está deshabilitado */
  disabled?: boolean;
  /** Tipo del botón HTML */
  type?: 'button' | 'submit' | 'reset';
  /** Clases CSS adicionales */
  className?: string;
}

/**
 * Componente Button reutilizable
 * 
 * @example
 * ```tsx
 * // Botón primario por defecto
 * <Button onClick={handleClick}>Click me</Button>
 * 
 * // Botón secundario pequeño
 * <Button variant="secondary" size="sm" onClick={handleClick}>
 *   Cancelar
 * </Button>
 * 
 * // Botón outline grande deshabilitado
 * <Button 
 *   variant="outline" 
 *   size="lg" 
 *   disabled 
 *   onClick={handleClick}
 * >
 *   Enviar
 * </Button>
 * 
 * // Botón de submit con clases adicionales
 * <Button 
 *   type="submit" 
 *   className="w-full mt-4"
 * >
 *   Guardar
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  // Clases base que se aplican a todos los botones
  const baseClasses = "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Clases específicas para cada variante
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 shadow-sm",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500 shadow-sm",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500 bg-transparent"
  };
  
  // Clases específicas para cada tamaño
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
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
      {children}
    </button>
  );
};
