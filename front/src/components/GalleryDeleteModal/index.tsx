import React from 'react';
import { X, Trash2 } from 'react-feather';
import { useScreenSize } from '../../context';
import { createIconWithCircle } from '../../constants';
import type { GalleryImage } from '../../pages/Galeria/types';

interface GalleryDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: GalleryImage | null;
  onConfirm: () => void;
}

/**
 * Modal para eliminar imágenes de la galería
 * 
 * Permite eliminar una imagen de la galería
 * sin depender del sistema de recursos del backend.
 */
const GalleryDeleteModal: React.FC<GalleryDeleteModalProps> = ({
  isOpen,
  onClose,
  image,
  onConfirm
}) => {
  const { dimensions } = useScreenSize();

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full"
      >
        {/* Header */}
        <div 
          className="relative bg-gradient-to-br from-[#5D5A88] via-[#6B6A9A] to-[#827896] p-6 rounded-t-lg"
        >
          <h2 
            className="text-white font-semibold text-center"
            style={{ fontSize: dimensions.fontSize.lg }}
          >
            Eliminar Imagen
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            {createIconWithCircle(X, 20, 'white')}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <img
              src={image.src}
              alt={image.alt}
              className="w-24 h-24 object-cover rounded-lg mx-auto mb-4"
            />
            <h3 
              className="font-semibold text-gray-900 mb-2"
              style={{ fontSize: dimensions.fontSize.md }}
            >
              {image.title}
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontSize: dimensions.fontSize.sm }}
            >
              {image.description}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              {createIconWithCircle(Trash2, 20, '#EF4444')}
              <div>
                <p 
                  className="font-medium text-red-800"
                  style={{ fontSize: dimensions.fontSize.sm }}
                >
                  ¿Estás seguro de que quieres eliminar esta imagen?
                </p>
                <p 
                  className="text-red-600 mt-1"
                  style={{ fontSize: dimensions.fontSize.xs }}
                >
                  Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            style={{ fontSize: dimensions.fontSize.sm }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            style={{ fontSize: dimensions.fontSize.sm }}
          >
            {createIconWithCircle(Trash2, 16, 'white')}
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryDeleteModal;
