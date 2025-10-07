/**
 * Configuración centralizada de títulos para páginas
 * 
 * Patrón similar a cardConfigs - configuración independiente del componente
 */

export const PAGE_HEADERS = {
  '/dashboard': {
    title: 'Conoce nuestros beneficios y funcionalidades'
  },
  '/alianza': {
    title: 'Nueva alianza'
  },
  '/gobernanza': {
    title: 'Gobernanzas'
  },
  '/planeacion': {
    title: 'PLANEACIÓN'
  },
  '/iniciativas': {
    title: 'Iniciativas'
  },
  '/asistenteIa': {
    title: 'ASISTENTE IA'
  },
  '/galeria': {
    title: 'GALERÍA DE FOTOS E HITOS'
  }
} as const;

export type PagePath = keyof typeof PAGE_HEADERS;
export type PageHeaderConfig = typeof PAGE_HEADERS[PagePath];
