import React from 'react';
import { Users } from 'react-feather';
import { useScreenSize } from '../../context';

/**
 * Estado vacío de la tabla de usuarios
 * Componente extraído sin cambios visuales
 */
export const UserTableEmpty: React.FC = () => {
  const { scale } = useScreenSize();

  return (
    <div 
      className="text-center py-8 text-gray-500"
      style={{
        paddingTop: scale(32),
        paddingBottom: scale(32)
      }}
    >
      <Users 
        size={scale(48)} 
        className="mx-auto mb-4 text-gray-400" 
      />
      <p style={{ fontSize: scale(16) }}>
        No hay usuarios registrados
      </p>
    </div>
  );
};
