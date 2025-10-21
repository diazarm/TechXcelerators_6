/**
 * Estado vacío de la tabla de documentos
 * Siguiendo el mismo diseño de UserTableEmpty
 */

import React from 'react';
import { FileText } from 'react-feather';
import { useScreenSize } from '../../../context';

interface DocumentTableEmptyProps {
  message?: string;
}

export const DocumentTableEmpty: React.FC<DocumentTableEmptyProps> = ({ 
  message = "No hay documentos disponibles" 
}) => {
  const { scale } = useScreenSize();

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-200 rounded-b-lg">
      <FileText size={scale(48)} className="text-gray-400 mb-4" />
      <p className="text-lg font-semibold text-gray-700 mb-2">
        {message}
      </p>
      <p className="text-sm text-gray-600 text-center">
        Los documentos aparecerán aquí cuando sean subidos por el administrador.
      </p>
    </div>
  );
};

