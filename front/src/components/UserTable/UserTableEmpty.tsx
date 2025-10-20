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
      className="flex flex-col items-center justify-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100"
      style={{
        paddingTop: scale(48),
        paddingBottom: scale(48),
        borderRadius: scale(8),
        borderWidth: scale(1)
      }}
    >
      <Users 
        size={scale(48)} 
        className="text-gray-400"
        style={{ marginBottom: scale(16) }}
      />
      <p 
        className="font-medium"
        style={{ fontSize: scale(16) }}
      >
        No hay usuarios registrados
      </p>
      <p 
        className="text-sm"
        style={{ 
          fontSize: scale(14),
          marginTop: scale(8)
        }}
      >
        Asegúrate de que haya usuarios registrados en el sistema.
      </p>
    </div>
  );
};
