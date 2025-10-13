/**
 * Mapeo centralizado de rutas a secciones del sistema
 * Facilita la gestión y escalabilidad al agregar nuevas secciones
 */

export interface SectionConfig {
  sectionId: string;
  title: string;
}

/**
 * Mapeo de rutas a configuración de secciones
 */
export const ROUTE_TO_SECTION_MAP = {
  '/alianza': {
    sectionId: '68c9f2d8d6dbf0c558131e16',
    title: 'Nuestra Alianza'
  },
  '/gobernanza': {
    sectionId: '68cadb4f54f9344f27defc7b',
    title: 'Gobernanza'
  },
  '/gestion': {
    sectionId: '68cadccc54f9344f27defc7f',
    title: 'Gestión'
  }
  // Agregar nuevas secciones aquí:
  // '/planeacion': {
  //   sectionId: '68cadba054f9344f27defc7d',
  //   title: 'Planeación'
  // },
  // '/iniciativas': {
  //   sectionId: '68cadd0154f9344f27defc81',
  //   title: 'Iniciativas'
  // }
} as const;

/**
 * Tipo para las rutas válidas del sistema
 */
export type ValidRoute = keyof typeof ROUTE_TO_SECTION_MAP;

/**
 * Obtiene la configuración de sección para una ruta específica
 * @param pathname - Ruta de la página (ej: '/alianza')
 * @returns Configuración de la sección o undefined si no existe
 */
export const getSectionByRoute = (pathname: string): SectionConfig | undefined => {
  return ROUTE_TO_SECTION_MAP[pathname as ValidRoute];
};

/**
 * Obtiene todas las secciones disponibles con sus rutas
 * @returns Array de secciones con ruta y configuración
 */
export const getAllSections = () => {
  return Object.entries(ROUTE_TO_SECTION_MAP).map(([route, config]) => ({
    route,
    ...config
  }));
};

/**
 * Verifica si una ruta tiene sección configurada
 * @param pathname - Ruta a verificar
 * @returns true si la ruta tiene sección configurada
 */
export const hasSection = (pathname: string): boolean => {
  return pathname in ROUTE_TO_SECTION_MAP;
};

/**
 * Obtiene el título de una sección por su ID
 * @param sectionId - ID de la sección
 * @returns Título de la sección o undefined si no existe
 */
export const getSectionTitleById = (sectionId: string): string | undefined => {
  const section = Object.values(ROUTE_TO_SECTION_MAP).find(
    config => config.sectionId === sectionId
  );
  return section?.title;
};

