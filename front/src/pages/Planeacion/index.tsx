import React from 'react';
import { CardGrid, ResourceEditModal, ResourceDeleteModal, Notification, LoadingSpinner } from '../../components';
import { useCards, usePageHeader, useResourceManagement, useAlliances } from '../../hooks';
import { useScreenSize } from '../../context';

const Planeacion: React.FC = () => {
  const { getContainerForScreen } = useScreenSize();
  usePageHeader();

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
    pageType: 'planeacion',
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick
  });

  const { loading, error } = useAlliances();

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

      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <div>
          <Notification type="error" message={`Error al cargar alianzas: ${error}`} />
        </div>
      )}

      <CardGrid 
        cards={cards} 
        onCardClick={handleCardClick} 
        columns={2}
        defaultCardSize="rectangular"
      />
    </div>
  );
};

export default Planeacion;


