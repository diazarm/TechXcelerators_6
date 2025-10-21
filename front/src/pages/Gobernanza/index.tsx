import React, { useEffect, useState } from 'react';
import { CardGrid, ResourceEditModal, ResourceDeleteModal } from '../../components';
import { useCards, usePageHeader, useResourceManagement } from '../../hooks';
import { useScreenSize } from '../../context';
import type { CardConfig } from '../../constants';

const Gobernanza: React.FC = () => {
  const { getContainerForScreen, dimensions } = useScreenSize();
  
  const { 
    editModalOpen, deleteModalOpen, selectedResource, closeModals,
    handleEditClick, handleDeleteClick, handleUpdateResource, handleSoftDeleteResource
  } = useResourceManagement();
  
  const { cards: baseCards, handleCardClick } = useCards({ 
    pageType: 'gobernanza',
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  });
  
  const [cards, setCards] = useState<CardConfig[]>(baseCards);
  
  usePageHeader();

  // Cargar cards frescas del backend al montar
  useEffect(() => {
    const loadFreshCards = async () => {
      try {
        const { resourceService } = await import('../../services/resourceService');
        const freshResources = await resourceService.getResourcesBySection('68cadb4f54f9344f27defc7b');
        
        // Actualizar cards con datos frescos del backend
        setCards(prevCards => {
          const updatedCards = prevCards.map(card => {
            const freshResource = freshResources.find(r => r._id === card.resourceId);
            if (freshResource) {
              return {
                ...card,
                title: freshResource.name,
                resourceName: freshResource.name
              };
            }
            return card;
          });
          return updatedCards;
        });
      } catch (error) {
        console.error('Error al cargar cards frescas al montar:', error);
        // Fallback a baseCards si hay error
        setCards(baseCards);
      }
    };

    loadFreshCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escuchar evento de recurso eliminado para actualizar visual
  useEffect(() => {
    const handleResourceDeleted = (event: CustomEvent) => {
      const { resource } = event.detail;
      
      // Actualizar la card correspondiente marcándola como inactiva
      setCards(prevCards => 
        prevCards.map(card => 
          card.resourceName === resource.name 
            ? { ...card, isActive: false }
            : card
        )
      );
    };

    window.addEventListener('resourceDeleted', handleResourceDeleted as EventListener);
    
    return () => {
      window.removeEventListener('resourceDeleted', handleResourceDeleted as EventListener);
    };
  }, []);

  // Escuchar evento de recurso restaurado para actualizar visual
  useEffect(() => {
    const handleResourceRestored = (event: CustomEvent) => {
      const { resourceName } = event.detail;
      
      // Actualizar la card correspondiente marcándola como activa
      setCards(prevCards => 
        prevCards.map(card => 
          card.resourceName === resourceName 
            ? { ...card, isActive: true }
            : card
        )
      );
    };

    window.addEventListener('resourceRestored', handleResourceRestored as EventListener);
    
    return () => {
      window.removeEventListener('resourceRestored', handleResourceRestored as EventListener);
    };
  }, []);

  // Escuchar evento de recurso actualizado para refresh automático
  useEffect(() => {
    const handleResourceUpdated = async (event: CustomEvent) => {
      const { shouldRefresh } = event.detail;
      
      if (shouldRefresh) {
        try {
          // Importar servicio dinámicamente
          const { resourceService } = await import('../../services/resourceService');
          
          // Hacer nueva consulta al backend para obtener datos frescos
          const freshResources = await resourceService.getResourcesBySection('68cadb4f54f9344f27defc7b');
          
          // Actualizar cards con datos frescos del backend
          setCards(prevCards => 
            prevCards.map(card => {
              const freshResource = freshResources.find(r => r._id === card.resourceId);
              return freshResource ? {
                ...card,
                title: freshResource.name,
                resourceName: freshResource.name
              } : card;
            })
          );
        } catch (error) {
          console.error('Error al refrescar recursos:', error);
        }
      }
    };

    window.addEventListener('resourceUpdated', handleResourceUpdated as unknown as EventListener);
    
    return () => {
      window.removeEventListener('resourceUpdated', handleResourceUpdated as unknown as EventListener);
    };
  }, []);

  return (
    <div className={`${getContainerForScreen()}`}>
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
      
      {cards.length > 0 ? (
        <CardGrid 
          cards={cards} 
          onCardClick={handleCardClick}
          defaultCardSize="medium"
        />
      ) : (
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
            No se encontraron recursos de gobernanza.
          </p>
        </div>
      )}
    </div>
  );
};

export default Gobernanza;
