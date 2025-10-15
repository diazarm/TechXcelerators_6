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
 * Filtra alianzas (actualmente no aplica ningún filtro)
 * @param alliances - Array de alianzas
 * @returns Array de alianzas sin filtrar
 */
export const filterAlliances = (alliances: Alliance[]): Alliance[] => {
  return alliances;
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
 * Maneja inconsistencias en labels (case-insensitive, sufijos, etc.)
 * @param resource - Recurso que contiene los links
 * @param alliance - Alianza seleccionada
 * @returns Link encontrado o undefined
 */
export const findAllianceLink = (resource: IResource, alliance: Alliance) => {
  return resource.links.find((link: { label?: string; url?: string }) => {
    const label = link.label?.trim();
    const siglas = alliance.siglas.trim();
    
    if (!label) return false;
    
    // Match case-insensitive
    const labelUpper = label.toUpperCase();
    const siglasUpper = siglas.toUpperCase();
    
    // 1. Match exacto (case-insensitive)
    if (labelUpper === siglasUpper) return true;
    
    // 2. Match si el label comienza con las siglas seguido de espacio
    // Esto maneja casos como "EAFIT diplomados", "EAFIT Inglés"
    if (labelUpper.startsWith(siglasUpper + ' ')) return true;
    
    // 3. Casos especiales de variaciones conocidas
    // UNINORTE vs Uninorte
    if (siglasUpper === 'UNINORTE' && labelUpper === 'UNINORTE') return true;
    
    return false;
  });
};

/**
 * Busca TODOS los links para una alianza (para casos de múltiples programas)
 * @param resource - Recurso que contiene los links
 * @param alliance - Alianza seleccionada
 * @returns Array de links que coinciden con la alianza
 */
export const findAllAllianceLinks = (resource: IResource, alliance: Alliance) => {
  return resource.links.filter((link: { label?: string; url?: string }) => {
    const label = link.label?.trim();
    const siglas = alliance.siglas.trim();
    
    if (!label) return false;
    
    const labelUpper = label.toUpperCase();
    const siglasUpper = siglas.toUpperCase();
    
    // Mismo criterio que findAllianceLink
    if (labelUpper === siglasUpper) return true;
    if (labelUpper.startsWith(siglasUpper + ' ')) return true;
    if (siglasUpper === 'UNINORTE' && labelUpper === 'UNINORTE') return true;
    
    return false;
  });
};

/**
 * Maneja clicks en cards de alianza
 * Función principal que coordina toda la lógica de navegación
 */
export const handleAllianceCardClick = async (sectionType: string, resourceName?: string, showModal?: boolean) => {
  try {
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

    // Estado para manejo de múltiples programas
    let selectedAllianceForPrograms: Alliance | null = null;
    let availablePrograms: { label: string; url: string }[] = [];

    // Función para manejar selección de alianza
    const handleAllianceSelect = (selectedAlliance: Alliance) => {
      // Buscar TODOS los links para esta alianza
      const allianceLinks = findAllAllianceLinks(resource, selectedAlliance);
      
      if (allianceLinks.length === 0) {
        // Sin links
        showNotification('warning', 'Enlace no encontrado', `No se encontró enlace para la alianza ${selectedAlliance.siglas}. Intenta con otra alianza.`);
        return;
      }
      
      if (allianceLinks.length === 1) {
        // Un solo link → Navegar directo
        navigateToUrl(allianceLinks[0].url);
        closeModal();
      } else {
        // Múltiples links → Mostrar selector de programas
        selectedAllianceForPrograms = selectedAlliance;
        availablePrograms = allianceLinks.filter((link): link is { label: string; url: string } => 
          link.label !== undefined && link.url !== undefined
        );
        
        // Re-renderizar modal con selector de programas
        renderModalWithProgramSelector();
      }
    };

    // Función para renderizar modal con selector de programas integrado
    const renderModalWithProgramSelector = () => {
      const { useState } = React;
      
      // Componente que integra selector en la modal original
      const EnhancedAllianceModal = () => {
        const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
        const [showingPrograms] = useState(true);
        
        const handleProgramSelect = () => {
          const selectedProgram = availablePrograms[selectedProgramIndex];
          navigateToUrl(selectedProgram.url);
          closeModal();
        };
        
        const handleBackToAlliances = () => {
          renderInitialModal();
        };
        
        return React.createElement(AllianceSelectionModal, {
          isOpen: true,
          onClose: closeModal,
          alliances: alliances,
          onSelect: handleAllianceSelect,
          sectionTitle: resource.name,
          isLoading: false,
          // Props adicionales para selector de programas
          showProgramSelector: showingPrograms,
          selectedAlliance: selectedAllianceForPrograms,
          availablePrograms: availablePrograms.map(p => p.label),
          selectedProgramIndex: selectedProgramIndex,
          onProgramChange: setSelectedProgramIndex,
          onProgramConfirm: handleProgramSelect,
          onBackToAlliances: handleBackToAlliances
        });
      };
      
      root.render(
        React.createElement(ScreenSizeProvider, null,
          React.createElement(EnhancedAllianceModal)
        )
      );
    };

    // Función para renderizar modal inicial
    const renderInitialModal = () => {
      root.render(
        React.createElement(ScreenSizeProvider, { children: null },
          React.createElement(AllianceSelectionModal, {
            isOpen: true,
            onClose: closeModal,
            alliances: alliances,
            onSelect: handleAllianceSelect,
            sectionTitle: resource.name,
            isLoading: false
          })
        )
      );
    };
    
    // Renderizar modal inicial
    renderInitialModal();
    
  } catch (error) {
    showNotification('error', 'Error de modal', 'Error al abrir la selección de alianzas');
  }
};
