import React, { useState } from 'react';
import { useScreenSize } from '../../context';
import { usePageHeader } from '../../hooks';
import { useGalleryCards } from '../../hooks';
import { GalleryCardGrid, GalleryEditModal, GalleryDeleteModal } from '../../components';
import type { GalleryImage } from './types';

const Galeria: React.FC = () => {
  const { getContainerForScreen } = useScreenSize();
  usePageHeader(); // Configuración automática del título

  // Estados para los modales de galería
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Hook para manejar las cards de galería
  const { cards, handleCardClick } = useGalleryCards({
    onEditClick: (resourceName: string) => {
      // Crear un objeto GalleryImage temporal para el modal
      const card = cards.find(c => c.resourceName === resourceName);
      if (card) {
        setSelectedImage({
          id: card.id,
          src: card.image || '',
          alt: card.title,
          title: card.title,
          description: card.description,
          website: card.href || ''
        });
        setEditModalOpen(true);
      }
    },
    onDeleteClick: (resourceName: string) => {
      // Crear un objeto GalleryImage temporal para el modal
      const card = cards.find(c => c.resourceName === resourceName);
      if (card) {
        setSelectedImage({
          id: card.id,
          src: card.image || '',
          alt: card.title,
          title: card.title,
          description: card.description,
          website: card.href || ''
        });
        setDeleteModalOpen(true);
      }
    }
  });


  const handleSaveImage = async (imageData: { title: string; description: string; website: string; links: Array<{ label: string; url: string }> }) => {
    // En una implementación real, aquí se actualizaría la configuración
    // Por ahora, solo cerramos el modal ya que las cards vienen de la configuración
    console.log('Guardando imagen:', imageData);
  };

  const handleDeleteImage = () => {
    // En una implementación real, aquí se eliminaría la card
    // Por ahora, solo cerramos el modal ya que las cards vienen de la configuración
    console.log('Eliminando imagen:', selectedImage);
  };

  const closeModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={`${getContainerForScreen()}`}>
      {/* Subtítulo personalizado - Mismo estilo que Iniciativas */}
      <div className="text-center mb-8">
        <h2 
          className="font-normal leading-[30px] tracking-[0%]"
          style={{ 
            fontSize: '20px',
            color: '#9795B5',
            fontFamily: 'DM Sans, sans-serif'
          }}
        >
          Galería de fotos e hitos de la alianza.
        </h2>
      </div>

      {/* Modales de gestión de galería */}
      <GalleryEditModal
        isOpen={editModalOpen}
        onClose={closeModals}
        image={selectedImage}
        onSave={handleSaveImage}
      />
      
      <GalleryDeleteModal
        isOpen={deleteModalOpen}
        onClose={closeModals}
        image={selectedImage}
        onConfirm={handleDeleteImage}
      />

      {/* Grid de Cards 3x3 */}
      <GalleryCardGrid 
        cards={cards} 
        onCardClick={handleCardClick}
        columns={3}
      />
    </div>
  );
};

export default Galeria;
