/**
 * Mapeo de secciones y rutas
 * 
 * Define la relación entre rutas de la aplicación y secciones del backend
 * para facilitar la navegación y gestión de recursos.
 */

/**
 * Mapeo de rutas a secciones
 */
export const ROUTE_TO_SECTION_MAP = {
  '/gobernanza': {
    sectionId: '68cadb4f54f9344f27defc7b',
    title: 'Gobernanza'
  },
  '/gestion': {
    sectionId: '68cadccc54f9344f27defc7f',
    title: 'Gestión'
  },
  '/galeria': {
    sectionId: '68cadd9354f9344f27defc83',
    title: 'Galería de fotos e hitos de la alianza'
  },
  '/alianza': {
    sectionId: '68c9f2d8d6dbf0c558131e16',
    title: 'Nuestra Alianza'
  },
  '/planeacion': {
    sectionId: '68cadba054f9344f27defc7d',
    title: 'Planeación'
  },
  '/iniciativas': {
    sectionId: '68cadd0154f9344f27defc81',
    title: 'Iniciativas'
  },
  '/chatIa': {
    sectionId: '68cade8354f9344f27defc87',
    title: 'Chat IA'
  }
} as const;

/**
 * IDs de secciones para uso en componentes
 */
export const SECTION_IDS = {
  GOBERNANZA: '68cadb4f54f9344f27defc7b',
  GESTION: '68cadccc54f9344f27defc7f',
  GALERIA: '68cadd9354f9344f27defc83',
  ALIANZA: '68c9f2d8d6dbf0c558131e16',
  PLANEACION: '68cadba054f9344f27defc7d',
  INICIATIVAS: '68cadd0154f9344f27defc81',
  CHAT_IA: '68cade8354f9344f27defc87'
} as const;

export type RoutePath = keyof typeof ROUTE_TO_SECTION_MAP;
export type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS];
