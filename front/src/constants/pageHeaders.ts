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
    title: 'Nuestra alianza',
    description: 'Información básica del acuerdo de la Alianza, evaluar permisos para visualización de contratos o documentos confidenciales. + Información del ADN de la Alianza (Student Person, USP de la Alianza) + Portafolio activo.'
  },
  '/gobernanza': {
    title: 'Gobernanzas',
    description: 'Equipo de trabajo, actas, grabaciones y presentaciones de comités.'
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
    title: 'Galería de fotos'
  }
} as const;

export type PagePath = keyof typeof PAGE_HEADERS;
export type PageHeaderConfig = typeof PAGE_HEADERS[PagePath];
