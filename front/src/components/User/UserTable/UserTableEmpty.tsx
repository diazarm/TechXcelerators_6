import React from 'react';

interface UserTableEmptyProps {
  message?: string;
}

/**
 * Estado vacío de la tabla de usuarios
 * Componente extraído sin cambios visuales
 */
export const UserTableEmpty: React.FC<UserTableEmptyProps> = ({ 
  message = "No hay usuarios disponibles"
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 bg-white rounded-lg shadow-sm border border-gray-100 py-12">
      <p className="font-medium text-base">
        {message}
      </p>
    </div>
  );
};
