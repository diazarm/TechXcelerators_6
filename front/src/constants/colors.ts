/**
 * Paleta de colores del sistema
 * Centraliza todos los colores para evitar duplicación y mantener consistencia
 */

export const COLORS = {
  // Colores principales
  primary: '#FF6E00',
  primaryHover: '#E55A00',
  primaryLight: '#FF8A33',
  
  // Colores de texto
  textPrimary: '#5D5A88',
  textSecondary: '#827896',
  textLight: '#A4A9C2',
  
  // Colores de fondo
  background: '#FFFFFF',
  backgroundLight: '#F8F9FA',
  
  // Colores de borde
  border: '#D4D2E3',
  borderLight: '#E5E7EB',
  
  // Colores de estado
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6'
} as const;

/**
 * Clases de Tailwind CSS para colores
 * Para usar con className
 */
export const COLOR_CLASSES = {
  // Colores principales
  primary: 'text-[#FF6E00]',
  primaryBg: 'bg-[#FF6E00]',
  primaryBorder: 'border-[#FF6E00]',
  primaryHover: 'hover:bg-[#E55A00]',
  primaryHoverText: 'hover:text-[#E55A00]',
  
  // Colores de texto
  textPrimary: 'text-[#5D5A88]',
  textSecondary: 'text-[#827896]',
  textLight: 'text-[#A4A9C2]',
  
  // Colores de fondo
  background: 'bg-white',
  backgroundLight: 'bg-gray-50',
  
  // Colores de borde
  border: 'border-[#D4D2E3]',
  borderLight: 'border-gray-200'
} as const;
