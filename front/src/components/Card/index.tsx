import React from 'react';
import { ArrowRight } from 'react-feather';
import { Button } from '../Button';
import { useResponsive, useBreakpoints } from '../../hooks';
import { COLOR_CLASSES } from '../../constants';
import type { CardProps } from './types';

/**
 * Componente Card reutilizable con diseño consistente y responsivo
 * @param title - Título de la card
 * @param description - Descripción de la card
 * @param icon - Icono opcional (React node)
 * @param onButtonClick - Función al hacer click en el botón
 * @param className - Clases CSS adicionales
 */
const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  onButtonClick,
  className = ""
}) => {
  const responsive = useResponsive();
  const { isMobile } = useBreakpoints();

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300
        border border-gray-100 hover:border-gray-200
        ${responsive.border.radius.medium}
        ${responsive.shadow.small}
        ${isMobile ? 'p-4' : 'p-6'}
        flex flex-col
        ${className}
      `}
    >
      {/* Icon - Solo mostrar si existe */}
      {icon && (
        <div className="mb-4 relative top-[7.25px] left-[10.88px]">
          {icon}
        </div>
      )}
      
      {/* Title */}
      <h3 className={`
        ${responsive.text.h4}
        ${COLOR_CLASSES.textPrimary} mb-3
        ${isMobile ? 'mb-2' : 'mb-3'}
      `}>
        {title}
      </h3>
      
      {/* Description */}
      <p className={`
        ${responsive.text.small}
        ${COLOR_CLASSES.textSecondary} flex-grow
        ${isMobile ? 'mb-4' : 'mb-6'}
      `}>
        {description}
      </p>
      
      {/* Button - Posicionado en esquina inferior derecha */}
      <div className="flex justify-end mt-auto">
        <Button
          variant="primary"
          size="xs"
          onClick={onButtonClick}
          iconRight={<ArrowRight className="w-4 h-4" />}
        >
          Ir
        </Button>
      </div>
    </div>
  );
};

export default Card;
