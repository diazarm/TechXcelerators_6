import React, { useEffect, useState } from 'react';
import { CardGrid, ResourceEditModal, ResourceDeleteModal } from '../../components';
import { useCards, usePageHeader, useResourceManagement } from '../../hooks';
import { useScreenSize } from '../../context';
import { LoadingSpinner } from '../../components';
import type { CardConfig } from '../../constants';

const Gestion: React.FC = () => {
  const { getContainerForScreen, dimensions } = useScreenSize();
  
  // Hook para gestión de recursos
  const { 
    editModalOpen, 
    deleteModalOpen, 
    selectedResource, 
    closeModals,
    handleEditClick, 
    handleDeleteClick,
    handleUpdateResource,
    handleSoftDeleteResource
  } = useResourceManagement();
  
  const { cards: baseCards, handleCardClick } = useCards({ 
    pageType: 'gestion',
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  });
  
  // Estado local para las cards con su isActive actualizado
  const [cards, setCards] = useState<CardConfig[]>(baseCards);
  
  usePageHeader(); // Configuración automática del título

  // Actualizar cards cuando baseCards cambia (solo al montar)
  useEffect(() => {
    setCards(baseCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escuchar evento de recurso eliminado para actualizar visual
  useEffect(() => {
    const handleResourceDeleted = (event: Event) => {
      const customEvent = event as CustomEvent;
      const deletedResourceName = customEvent.detail?.resourceName;
      
      if (deletedResourceName) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.resourceName === deletedResourceName 
              ? { ...card, isActive: false }
              : card
          )
        );
      }
    };

    const handleResourceRestored = (event: Event) => {
      const customEvent = event as CustomEvent;
      const restoredResourceName = customEvent.detail?.resourceName;
      
      if (restoredResourceName) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.resourceName === restoredResourceName 
              ? { ...card, isActive: true }
              : card
          )
        );
      }
    };

    const handleResourceUpdated = (event: CustomEvent) => {
      const { oldName, newName } = event.detail;
      setCards(prevCards => 
        prevCards.map(card => 
          card.resourceName === oldName 
            ? { ...card, title: newName, resourceName: newName }
            : card
        )
      );
    };

    window.addEventListener('resourceDeleted', handleResourceDeleted);
    window.addEventListener('resourceRestored', handleResourceRestored);
    window.addEventListener('resourceUpdated', handleResourceUpdated as EventListener);

    return () => {
      window.removeEventListener('resourceDeleted', handleResourceDeleted);
      window.removeEventListener('resourceRestored', handleResourceRestored);
      window.removeEventListener('resourceUpdated', handleResourceUpdated as EventListener);
    };
  }, []); // Sin dependencias, escucha siempre

  // Mostrar loading si no hay cards
  if (cards.length === 0) {
    return (
      <div className={`${getContainerForScreen()}`}>
        <div className="flex justify-center items-center" style={{ minHeight: '400px' }}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Mostrar error si no hay cards y no está cargando
  if (cards.length === 0) {
    return (
      <div className={`${getContainerForScreen()}`}>
        <div className="text-center py-12">
          <div 
            className="bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              width: dimensions.spacing.xl,
              height: dimensions.spacing.xl
            }}
          >
            <svg 
              className="text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                width: dimensions.spacing.md,
                height: dimensions.spacing.md
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 
            className="text-gray-900 font-semibold mb-2"
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            No hay tarjetas disponibles
          </h3>
          <p 
            className="text-gray-600"
            style={{ fontSize: dimensions.fontSize.md }}
          >
            No se encontraron recursos de gestión.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getContainerForScreen()}`}>
      {/* Modales de gestión de recursos */}
      <ResourceEditModal
        isOpen={editModalOpen}
        onClose={closeModals}
        resource={selectedResource}
        onSave={handleUpdateResource}
      />
      
      <ResourceDeleteModal
        isOpen={deleteModalOpen}
        onClose={closeModals}
        resource={selectedResource}
        onConfirm={handleSoftDeleteResource}
      />
      
      {/* Grid de Tarjetas - El título ahora viene del Header dinámico */}
      {cards.length > 0 ? (
      <CardGrid 
        cards={cards} 
        onCardClick={handleCardClick}
        defaultCardSize="medium"
      />
      ) : (
        /* Estado vacío */
        <div className="text-center py-12">
          <div 
            className="bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              width: dimensions.spacing.xl,
              height: dimensions.spacing.xl
            }}
          >
            <svg 
              className="text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{
                width: dimensions.spacing.md,
                height: dimensions.spacing.md
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 
            className="text-gray-900 font-semibold mb-2"
            style={{ fontSize: dimensions.fontSize['2xl'] }}
          >
            No hay tarjetas disponibles
          </h3>
         
          <p 
            className="text-gray-600"
            style={{ fontSize: dimensions.fontSize.md }}
          >
            No se encontraron recursos de gestión.
          </p>
        </div>
      )}
    </div>
  );
};

export default Gestion;
