/**
 * Servicio para manejo de logos de alianzas
 * Extraído de AllianceSelectionModal para centralizar la lógica
 */

/**
 * Mapeo de siglas de alianzas a sus logos correspondientes
 */
const LOGO_MAP: Record<string, string> = {
  'EAFIT': '/img/eafit.png',
  'UNAB': '/img/andresbello.png',
  'UDD': '/img/udd.png',
  'CENTRAL': '/img/ucentral.png',
  'UNIS': '/img/unis.png',
  'UP': '/img/panamericana.png',
  'UCSS': '/img/ucatolica.png', // Universidad Católica Sedes Sapientiae
  'UAC': '/img/ucusco.png' // Universidad Andina del Cusco
};

/**
 * Logo por defecto cuando no se encuentra el logo específico
 */
const DEFAULT_LOGO = '/img/Logo3.png';

/**
 * Obtiene el logo correspondiente a las siglas de una alianza
 * @param siglas - Siglas de la alianza
 * @returns URL del logo o logo por defecto
 */
export const getLogoForAlliance = (siglas: string): string => {
  return LOGO_MAP[siglas.toUpperCase()] || DEFAULT_LOGO;
};

/**
 * Verifica si existe un logo para las siglas dadas
 * @param siglas - Siglas de la alianza
 * @returns true si existe logo específico, false si usa el por defecto
 */
export const hasCustomLogo = (siglas: string): boolean => {
  return LOGO_MAP[siglas.toUpperCase()] !== undefined;
};

/**
 * Obtiene todas las siglas que tienen logos personalizados
 * @returns Array de siglas con logos personalizados
 */
export const getAvailableLogos = (): string[] => {
  return Object.keys(LOGO_MAP);
};
