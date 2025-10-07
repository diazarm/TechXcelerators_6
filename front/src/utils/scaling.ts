/**
 * Sistema de escalado centralizado
 * Extraído de cardConfigs.ts para mantener consistencia
 */

/**
 * Función de escalado basada en el ancho de la ventana
 */
export const getScaleFactor = (): number => {
  const width = window.innerWidth;
  const baseWidth = 1440; // Base de referencia
  const scaleFactor = width / baseWidth;
  return Math.max(0.8, Math.min(2.5, scaleFactor)); // Limitar entre 0.8 y 2.5
};

/**
 * Función para escalar valores numéricos
 */
export const scale = (value: number): number => {
  return Math.round(value * getScaleFactor());
};
