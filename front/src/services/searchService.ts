import type { SearchResult, BackendSearchResponse } from '../types/shared';
import { api } from './api';

/**
 * Servicio de búsqueda que maneja la transformación entre backend y frontend
 */

/**
 * Transforma la respuesta del backend al formato esperado por el frontend
 */
export const transformBackendResponse = (backendResponse: BackendSearchResponse): SearchResult[] => {
  const results: SearchResult[] = [];
  
  // Transformar alliances
  backendResponse.results.alliances.forEach(item => {
    results.push({
      id: item._id,
      title: item.name,
      description: item.description || `Alianza estratégica`,
      category: 'Alianza',
      path: `Alianzas`,
      type: 'Alianza',
      keywords: backendResponse.keywords || [],
      content: undefined,
      // Información adicional para el modal
      subtitle: item.siglas || 'Sin siglas',
      actionText: 'Ver alianza',
      hasUrl: !!item.url,
      // URL real del backend para navegación
      url: item.url
    });
  });
  
  // Transformar resources
  backendResponse.results.resources.forEach(item => {
    // Si no hay título, usar la descripción como título
    const title = item.title || item.description || 'Recurso sin título';
    
    // Obtener el primer link como URL principal
    const primaryUrl = item.links && item.links.length > 0 ? item.links[0].url : undefined;
    
    results.push({
      id: item._id,
      title: title,
      description: item.description || 'Recurso de información',
      category: 'Recurso',
      path: 'Recursos',
      type: 'Recurso',
      keywords: backendResponse.keywords || [],
      content: item.content,
      // Información adicional para el modal
      subtitle: item.sectionName || 'Sección general',
      actionText: 'Ver recurso',
      linksCount: item.links?.length || 0,
      // URL real del backend para navegación
      url: primaryUrl
    });
  });
  
  // Transformar sections
  backendResponse.results.sections.forEach(item => {
    results.push({
      id: item._id,
      title: item.name,
      description: item.description || 'Sección de contenido',
      category: 'Sección',
      path: 'Secciones',
      type: 'Sección',
      keywords: backendResponse.keywords || [],
      content: undefined,
      // Información adicional para el modal
      subtitle: `${item.resourcesCount || 0} recursos disponibles`,
      actionText: 'Explorar sección',
      resourcesCount: item.resourcesCount || 0
    });
  });
  
  return results;
};

/**
 * Búsqueda usando el backend real
 * Esta función se activará cuando se conecte con el backend real
 */
export const searchFromBackend = async (
  query: string, 
  page: number = 1, 
  limit: number = 10,
  _type: 'smart' | 'exact' = 'smart'
): Promise<SearchResult[]> => {
  try {
    const response = await api.get('/search', {
      params: {
        q: query,
        page,
        limit,
        type: _type
      }
    });
    
    return transformBackendResponse(response.data as BackendSearchResponse);
  } catch (error) {
    console.error('Error en búsqueda del backend:', error);
    throw error;
  }
};


/**
 * Servicio principal de búsqueda conectado al backend
 */
export const searchService = {
  /**
   * Realizar búsqueda en el backend
   * @param query - Término de búsqueda
   * @param page - Página actual
   * @param limit - Límite de resultados por página
   * @param type - Tipo de búsqueda (smart/exact)
   * @returns Array de resultados transformados
   */
  search: searchFromBackend
};
