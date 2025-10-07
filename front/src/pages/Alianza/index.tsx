import React, { useEffect } from 'react';
import { CardGrid, ResourceEditModal, ResourceDeleteModal } from '../../components';
import { useCards, usePageHeader, useAlliances, useResourceManagement } from '../../hooks';
import { useScreenSize } from '../../context';
import { LoadingSpinner } from '../../components';
import { Notification } from '../../components';

const Alianza: React.FC = () => {
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
  
  const { cards, handleCardClick } = useCards({ 
    pageType: 'alianza',
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  });
  const { alliances, loading, error, getAlliances } = useAlliances();
  usePageHeader(); // Configuración automática del título

  // Cargar alianzas al montar el componente
  useEffect(() => {
    getAlliances();
  }, [getAlliances]);

  // Mostrar loading
  if (loading) {
    return (
      <div className={`${getContainerForScreen()} flex items-center justify-center min-h-screen`}>
        <LoadingSpinner />
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className={`${getContainerForScreen()}`}>
        <Notification 
          type="error" 
          message={`Error al cargar alianzas: ${error}`}
        />
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
         
          {/* Debug: Mostrar información de alianzas */}
          {alliances.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">
                Se encontraron {alliances.length} alianzas en el backend
              </p>
              <div className="mt-2 text-xs text-blue-500">
                {alliances.map(alliance => (
                  <div key={alliance._id}>
                    {alliance.name} ({alliance.siglas})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Alianza;
