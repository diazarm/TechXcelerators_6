/**
 * Fila de la tabla de documentos
 * Siguiendo el mismo diseño de UserTableRow
 */

import React from 'react';
import { FileText, Edit3, EyeOff, Download, RotateCcw } from 'react-feather';
import { useScreenSize } from '../../context';
import type { IDocument } from '../../types/document';

interface DocumentTableRowProps {
  document: IDocument;
  onView: (document: IDocument) => void;
  onEdit?: (document: IDocument) => void;
  onDelete?: (document: IDocument) => void;
  onRestore?: (document: IDocument) => void;
  onVisibilityToggle?: (documentId: string, role: 'director' | 'user') => void;
  isAdmin: boolean;
}

/**
 * Obtener icono según el tipo MIME
 */
const getFileIcon = (mimeType: string, scale: (value: number) => number) => {
  const iconSize = scale(24);
  
  if (mimeType === 'application/pdf') {
    return <FileText size={iconSize} className="text-red-600" />;
  } else if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return <FileText size={iconSize} className="text-blue-600" />;
  } else if (mimeType === 'text/plain') {
    return <FileText size={iconSize} className="text-gray-600" />;
  }
  return <FileText size={iconSize} className="text-gray-400" />;
};

/**
 * Formatear fecha
 */
const formatDate = (date: Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

/**
 * Obtener label de categoría
 */
const getCategoryLabel = (category: IDocument['category']): string => {
  const labels: Record<IDocument['category'], string> = {
    manual: 'Manual',
    informe: 'Informe',
    guia: 'Guía',
    politicas: 'Políticas',
    faqs: 'FAQs',
    otros: 'Otros',
  };
  return labels[category] || category;
};

/**
 * Obtener roles en español (filtrado de admin, ya que siempre tiene acceso)
 */
const getRoleLabels = (roles: IDocument['visibleTo']): string => {
  const labels: Record<string, string> = {
    director: 'Director',
    user: 'Usuario',
  };
  // Filtrar admin (siempre tiene acceso, no es necesario mostrarlo)
  const visibleRoles = roles.filter(role => role !== 'admin');
  
  if (visibleRoles.length === 0) return 'Solo Admin';
  
  return visibleRoles.map((role) => labels[role] || role).join(', ');
};

export const DocumentTableRow: React.FC<DocumentTableRowProps> = ({
  document,
  onView,
  onEdit,
  onDelete,
  onRestore,
  onVisibilityToggle,
  isAdmin,
}) => {
  const { scale } = useScreenSize();

  const handleRoleToggle = (role: 'director' | 'user') => {
    if (onVisibilityToggle && !document.isDeleted) {
      onVisibilityToggle(document._id, role);
    }
  };

  return (
    <div 
      className="grid gap-3 px-4 py-3 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors items-center w-full"
      style={{ gridTemplateColumns: '60px 1.5fr 1fr 0.8fr 1fr 1.5fr' }}
    >
      {/* Tipo (Icono) */}
      <div className="flex justify-center">
        {getFileIcon(document.type, scale)}
      </div>

      {/* Nombre del documento */}
      <div
        onClick={() => onView(document)}
        className="font-medium text-gray-900 truncate cursor-pointer hover:text-[#FF6E00] text-sm"
        title={document.name}
      >
        {document.name}
      </div>

      {/* Categoría */}
      <div className="flex">
        <span className="inline-flex px-2 py-1 rounded-full bg-yellow-50 text-yellow-800 font-medium text-xs whitespace-nowrap">
          {getCategoryLabel(document.category)}
        </span>
      </div>

      {/* Fecha */}
      <div className="text-gray-600 text-sm">
        {formatDate(document.uploadDate)}
      </div>

      {/* Visible a */}
      <div className="flex gap-1.5 items-center">
        {isAdmin ? (
          // Admin: Badges clickeables para toggle
          <>
            {['director', 'user'].map((role) => {
              const isVisible = document.visibleTo.includes(role as 'director' | 'user');
              return (
                <button
                  key={role}
                  onClick={() => handleRoleToggle(role as 'director' | 'user')}
                  disabled={document.isDeleted}
                  className={`px-2 py-1 rounded-full font-medium text-xs whitespace-nowrap transition-all duration-200 ${
                    isVisible
                      ? role === 'director' 
                        ? 'bg-orange-100 text-orange-800 border border-orange-300 hover:bg-orange-200' 
                        : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'
                      : 'bg-white text-gray-400 border border-gray-300 hover:border-gray-400'
                  } ${document.isDeleted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  title={`Click para ${isVisible ? 'quitar' : 'dar'} acceso a ${role === 'director' ? 'Directores' : 'Usuarios'}`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} {isVisible ? '✓' : '✗'}
                </button>
              );
            })}
          </>
        ) : (
          // No admin: Solo texto
          <span className="text-gray-600 text-xs">{getRoleLabels(document.visibleTo)}</span>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-2 justify-center items-center">
        {/* Ver/Descargar */}
        <div 
          onClick={() => onView(document)}
          className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors px-2 py-1 gap-1"
          title="Ver documento"
        >
          <Download size={scale(12)} className="text-[#5D5A88] hover:text-[#FF6E00] transition-colors" />
          <span className="text-gray-500 whitespace-nowrap text-xs hidden xl:inline">
            Ver
          </span>
        </div>

        {/* Editar (solo Admin) */}
        {isAdmin && onEdit && (
          <div 
            onClick={() => onEdit(document)}
            className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors px-2 py-1 gap-1"
            title="Editar documento"
          >
            <Edit3 size={scale(12)} className="text-[#5D5A88] hover:text-[#FF6E00] transition-colors" />
            <span className="text-gray-500 whitespace-nowrap text-xs hidden xl:inline">
              Editar
            </span>
          </div>
        )}

        {/* Desactivar o Restaurar (solo Admin) */}
        {isAdmin && !document.isDeleted && onDelete && (
          <div 
            onClick={() => onDelete(document)}
            className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors px-2 py-1 gap-1"
            title="Desactivar documento"
          >
            <EyeOff size={scale(12)} className="text-[#5D5A88] hover:text-red-600 transition-colors" />
            <span className="text-gray-500 whitespace-nowrap text-xs hidden xl:inline">
              Desactivar
            </span>
          </div>
        )}
        {isAdmin && document.isDeleted && onRestore && (
          <div 
            onClick={() => onRestore(document)}
            className="cursor-pointer flex items-center hover:bg-gray-100 rounded-lg transition-colors px-2 py-1 gap-1"
            title="Restaurar documento"
          >
            <RotateCcw size={scale(12)} className="text-[#5D5A88] hover:text-green-600 transition-colors" />
            <span className="text-gray-500 whitespace-nowrap text-xs hidden xl:inline">
              Restaurar
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

