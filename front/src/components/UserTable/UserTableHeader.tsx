import React from 'react';
import { useScreenSize } from '../../context';

/**
 * Header de la tabla de usuarios
 * Componente extraído sin cambios visuales
 */
export const UserTableHeader: React.FC = () => {
  const { dimensions, scale, isMobile } = useScreenSize();

  return (
    <thead>
      <tr 
        className="bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0]"
        style={{
          borderBottomWidth: scale(1),
          borderBottomColor: '#E5E7EB'
        }}
      >
        <th 
          className="text-left font-semibold text-[#5D5A88]"
        style={{
          fontSize: isMobile ? scale(12) : scale(14),
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
        >
          Usuario
        </th>
        <th 
          className="text-left font-semibold text-[#5D5A88]"
        style={{
          fontSize: isMobile ? scale(12) : scale(14),
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
        >
          Email
        </th>
        <th 
          className="text-left font-semibold text-[#5D5A88]"
        style={{
          fontSize: isMobile ? scale(12) : scale(14),
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
        >
          Rol
        </th>
        <th 
          className="text-left font-semibold text-[#5D5A88]"
        style={{
          fontSize: isMobile ? scale(12) : scale(14),
          paddingTop: isMobile ? scale(6) : scale(8),
          paddingBottom: isMobile ? scale(6) : scale(8),
          paddingLeft: isMobile ? scale(8) : scale(12),
          paddingRight: isMobile ? scale(8) : scale(12)
        }}
        >
          Estado
        </th>
        <th 
          className="text-center font-semibold text-[#5D5A88]"
          style={{
            fontSize: dimensions.fontSize.sm,
            paddingTop: dimensions.spacing.sm,
            paddingBottom: dimensions.spacing.sm,
            paddingLeft: dimensions.spacing.md,
            paddingRight: dimensions.spacing.md
          }}
        >
          Acciones
        </th>
      </tr>
    </thead>
  );
};
