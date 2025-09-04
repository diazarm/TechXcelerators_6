import type { ReactNode } from 'react';

/**
 * Props del componente Button
 */
export interface ButtonProps {
  /** Contenido del botón */
  children: ReactNode;
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
  /** Icono a la izquierda */
  iconLeft?: ReactNode;
  /** Icono a la derecha */
  iconRight?: ReactNode;
}
