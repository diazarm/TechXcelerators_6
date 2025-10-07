/**
 * Servicio para lógica de navegación de alianzas
 * Extraído de cardConfigs.ts para separar lógica de negocio
 */

import type { Alliance } from '../types/alliance';
import type { IResource } from '../types/resource';

/**
 * Opciones para manejo de clicks en cards de alianza
 */
export interface AllianceCardClickOptions {
  sectionType: string;
  resourceName?: string;
  showModal?: boolean;
}

/**
 * Opciones para mostrar modal de selección
 */
export interface AllianceModalOptions {
  alliances: Alliance[];
  resource: IResource;
}

/**
 * Resultado de búsqueda de recursos
 */
export interface ResourceSearchResult {
  success: boolean;
  resource?: IResource;
  error?: string;
}

/**
 * Obtiene recursos por sección
 * @param sectionType - ID de la sección
 * @returns Promise con los recursos encontrados
 */
export const getResourcesBySection = async (sectionType: string): Promise<IResource[]> => {
  const { resourceService } = await import('./resourceService');
  return await resourceService.getResourcesBySection(sectionType);
};

/**
 * Obtiene todas las alianzas disponibles
 * @returns Promise con las alianzas
 */
export const getAlliances = async (): Promise<Alliance[]> => {
  const { allianceService } = await import('./allianceService');
  return await allianceService.getAlliances();
};

/**
 * Busca un recurso específico por nombre dentro de una sección
 * @param resources - Array de recursos
 * @param resourceName - Nombre del recurso a buscar
 * @returns Resultado de la búsqueda
 */
export const findResourceByName = (resources: IResource[], resourceName?: string): ResourceSearchResult => {
  if (!resourceName) {
    return {
      success: true,
      resource: resources[0]
    };
  }

  const targetResource = resources.find(resource => 
    resource.name === resourceName
  );

  if (!targetResource) {
    return {
      success: false,
      error: `No se encontró el recurso "${resourceName}"`
    };
  }

  if (!targetResource.isActive) {
    return {
      success: false,
      error: `El recurso "${resourceName}" está temporalmente deshabilitado. Contacte al administrador.`
    };
  }

  return {
    success: true,
    resource: targetResource
  };
};

/**
 * Filtra alianzas removiendo UNINORTE
 * @param alliances - Array de alianzas
 * @returns Array filtrado de alianzas
 */
export const filterAlliances = (alliances: Alliance[]): Alliance[] => {
  return alliances.filter(alliance => alliance.siglas !== 'UNINORTE');
};

/**
 * Valida si se debe mostrar modal para un recurso
 * @param resource - Recurso a validar
 * @param showModal - Flag explícito para mostrar modal
 * @returns true si se debe mostrar modal
 */
export const shouldShowModal = (resource: IResource, showModal?: boolean): boolean => {
  return Boolean(showModal && resource.links.length > 1);
};

/**
 * Navega a una URL
 * @param url - URL a la que navegar
 */
export const navigateToUrl = (url: string): void => {
  if (url.startsWith('http')) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
};

/**
 * Muestra notificación usando el sistema global
 * @param type - Tipo de notificación
 * @param title - Título de la notificación
 * @param message - Mensaje de la notificación
 */
export const showNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
  if (window.showNotification) {
    window.showNotification(type, title, message);
  } else {
    alert(`${title}: ${message}`);
  }
};

/**
 * Busca link específico para una alianza en un recurso
 * @param resource - Recurso que contiene los links
 * @param alliance - Alianza seleccionada
 * @returns Link encontrado o undefined
 */
export const findAllianceLink = (resource: IResource, alliance: Alliance) => {
  return resource.links.find((link: any) => 
    link.label?.trim() === alliance.siglas
  );
};

/**
 * Maneja clicks en cards de alianza
 * Función principal que coordina toda la lógica de navegación
 */
export const handleAllianceCardClick = async (sectionType: string, resourceName?: string, showModal?: boolean) => {
  try {
    console.log(`Clic en sección: ${sectionType}${resourceName ? `, recurso: ${resourceName}` : ''}`);
    
    try {
      // Obtener todos los recursos de la sección
      const resources = await getResourcesBySection(sectionType);
      
      if (resources.length > 0) {
        console.log(`Encontrados ${resources.length} recursos para ${sectionType}`);
        
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
            console.log(`Navegando a ${targetResource.name}: ${targetLink.url}`);
            
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
      console.log(`No se encontraron recursos para ${sectionType}:`, resourceError);
      showNotification('error', 'Error de conexión', 'No se encontraron recursos para esta sección. Próximamente se implementará esta funcionalidad.');
    }
    
  } catch (error) {
    console.error('Error al manejar click de card de alianza:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    showNotification('error', 'Error del sistema', `Error: ${errorMessage}`);
  }
};

/**
 * Muestra modal de selección de alianzas
 * @param alliances - Array de alianzas
 * @param resource - Recurso para el que se muestra el modal
 */
export const showAllianceSelectionModal = async (alliances: Alliance[], resource: IResource): Promise<void> => {
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
        console.log(`Navegando a ${selectedAlliance.siglas}: ${allianceLink.url}`);
        
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
    console.error('Error al mostrar modal:', error);
    showNotification('error', 'Error de modal', 'Error al abrir la selección de alianzas');
  }
};
