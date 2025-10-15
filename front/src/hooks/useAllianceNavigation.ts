/**
 * Hook para manejo de navegación de alianzas
 * Extraído de cardConfigs.ts para centralizar la lógica de navegación
 */

import { useCallback } from 'react';
import type { Alliance } from '../types/alliance';
import type { IResource } from '../types/resource';
import {
  getResourcesBySection,
  getAlliances,
  findResourceByName,
  filterAlliances,
  shouldShowModal,
  navigateToUrl,
  showNotification,
  findAllianceLink
} from '../services';

/**
 * Hook para manejo de navegación de alianzas
 * @returns Objeto con funciones de navegación
 */
export const useAllianceNavigation = () => {
  /**
   * Muestra modal de selección de alianzas
   * @param alliances - Array de alianzas
   * @param resource - Recurso para el que se muestra el modal
   */
  const showAllianceSelectionModal = useCallback(async (alliances: Alliance[], resource: IResource) => {
    try {
      // Importar modal dinámicamente
      const { AllianceSelectionModal } = await import('../components/AllianceSelectionModal');
      const React = await import('react');
      const { createRoot } = await import('react-dom/client');
      const { ScreenSizeProvider } = await import('../context/screenSize/ScreenSizeProvider');
      
      // Crear contenedor para la modal
      const modalContainer = document.createElement('div');
      modalContainer.id = 'alliance-selection-modal';
      document.body.appendChild(modalContainer);
      
      // Crear root de React
      const root = createRoot(modalContainer);
      
      // Función para cerrar modal
      const closeModal = () => {
        root.unmount();
        if (document.body.contains(modalContainer)) {
          document.body.removeChild(modalContainer);
        }
      };

      // Función para manejar selección de alianza
      const handleAllianceSelect = (selectedAlliance: Alliance) => {
        // Buscar el link específico para esta alianza
        const allianceLink = findAllianceLink(resource, selectedAlliance);
        
        if (allianceLink) {
          
          navigateToUrl(allianceLink.url);
          
          // Solo cerrar modal si se encontró y navegó exitosamente
          closeModal();
        } else {
          // Mostrar notificación pero mantener modal abierta
          showNotification('warning', 'Enlace no encontrado', `No se encontró enlace para la alianza ${selectedAlliance.siglas}. Intenta con otra alianza.`);
          // NO cerrar la modal aquí - permitir que el usuario seleccione otra alianza
        }
      };
      
      // Función para cerrar modal (botón X)
      const handleClose = () => {
        closeModal();
      };
      
      // Renderizar modal
      root.render(
        React.createElement(ScreenSizeProvider, { children: null },
          React.createElement(AllianceSelectionModal, {
            isOpen: true,
            onClose: handleClose,
            alliances: alliances,
            onSelect: handleAllianceSelect,
            sectionTitle: resource.name,
            isLoading: false
          })
        )
      );
      
    } catch (error) {
      showNotification('error', 'Error de modal', 'Error al abrir la selección de alianzas');
    }
  }, []);

  /**
   * Maneja click en card de alianza
   * @param sectionType - Tipo de sección
   * @param resourceName - Nombre del recurso (opcional)
   * @param showModal - Si mostrar modal (opcional)
   */
  const handleAllianceCardClick = useCallback(async (sectionType: string, resourceName?: string, showModal?: boolean) => {
    try {
      
      // Buscar recurso específico por nombre
      try {
        // Obtener todos los recursos de la sección
        const resources = await getResourcesBySection(sectionType);
        
        if (resources.length > 0) {
          
          // Buscar el recurso objetivo
          const searchResult = findResourceByName(resources, resourceName);
          
          if (!searchResult.success) {
            showNotification('error', 'Recurso no encontrado', searchResult.error || 'Error desconocido');
            return;
          }

          const targetResource = searchResult.resource!;
          
          if (targetResource && targetResource.links.length > 0) {
            // Si showModal es true, mostrar modal para seleccionar alianza
            if (shouldShowModal(targetResource, showModal)) {
              // Importar servicios de alianzas
              const alliances = await getAlliances();
              
              if (alliances.length === 0) {
                showNotification('warning', 'Sin alianzas', 'No hay alianzas disponibles para mostrar');
                return;
              }
              
              // Filtrar UNINORTE de las alianzas
              const filteredAlliances = filterAlliances(alliances);
              
              // Mostrar modal de selección
              await showAllianceSelectionModal(filteredAlliances, targetResource);
            } else {
              // Navegación directa al primer link
              const targetLink = targetResource.links[0];
              
              navigateToUrl(targetLink.url);
            }
          } else {
            showNotification('error', 'Recurso no encontrado', `No se encontró el recurso "${resourceName || 'disponible'}" para esta sección.`);
          }
          
        } else {
          // No hay recursos específicos para esta sección
          showNotification('info', 'Recursos próximamente', 'No hay recursos disponibles para esta sección. Próximamente se implementará esta funcionalidad.');
        }
      } catch (resourceError) {
        showNotification('error', 'Error de conexión', 'No se encontraron recursos para esta sección. Próximamente se implementará esta funcionalidad.');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      showNotification('error', 'Error del sistema', `Error: ${errorMessage}`);
    }
  }, [showAllianceSelectionModal]);

  return {
    handleAllianceCardClick,
    showAllianceSelectionModal
  };
};
