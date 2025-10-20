import React from 'react';
import { useScreenSize } from '../../context';

/**
 * Header de la tabla de usuarios
 * Componente extraído sin cambios visuales
 */
export const UserTableHeader: React.FC = () => {
  const { dimensions } = useScreenSize();

  return (
    <thead>
      <tr 
        className="bg-gradient-to-r from-[#F5F4F8] to-[#E8E6F0] border-b border-gray-200"
      >
        <th 
          className="text-left font-semibold text-[#5D5A88] py-4 px-6"
          style={{
            fontSize: dimensions.fontSize.md,
            paddingTop: dimensions.spacing.md,
            paddingBottom: dimensions.spacing.md,
            paddingLeft: dimensions.spacing.lg,
            paddingRight: dimensions.spacing.lg
          }}
        >
          Usuario
        </th>
        <th 
          className="text-left font-semibold text-[#5D5A88] py-4 px-6"
          style={{
            fontSize: dimensions.fontSize.md,
            paddingTop: dimensions.spacing.md,
            paddingBottom: dimensions.spacing.md,
            paddingLeft: dimensions.spacing.lg,
            paddingRight: dimensions.spacing.lg
          }}
        >
          Email
        </th>
        <th 
          className="text-left font-semibold text-[#5D5A88] py-4 px-6"
          style={{
            fontSize: dimensions.fontSize.md,
            paddingTop: dimensions.spacing.md,
            paddingBottom: dimensions.spacing.md,
            paddingLeft: dimensions.spacing.lg,
            paddingRight: dimensions.spacing.lg
          }}
        >
          Rol
        </th>
        <th 
          className="text-left font-semibold text-[#5D5A88] py-4 px-6"
          style={{
            fontSize: dimensions.fontSize.md,
            paddingTop: dimensions.spacing.md,
            paddingBottom: dimensions.spacing.md,
            paddingLeft: dimensions.spacing.lg,
            paddingRight: dimensions.spacing.lg
          }}
        >
          Estado
        </th>
        <th 
          className="text-center font-semibold text-[#5D5A88] py-4 px-6"
          style={{
            fontSize: dimensions.fontSize.md,
            paddingTop: dimensions.spacing.md,
            paddingBottom: dimensions.spacing.md,
            paddingLeft: dimensions.spacing.lg,
            paddingRight: dimensions.spacing.lg
          }}
        >
          Acciones
        </th>
      </tr>
    </thead>
  );
};
