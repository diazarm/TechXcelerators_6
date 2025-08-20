/**
 * Utilidades específicas para la página WelcomePage
 * 
 * Este archivo demuestra cómo organizar utilidades específicas de una página
 * siguiendo la estructura del proyecto.
 */

import type { TeamMember, Feature } from '../types';

/**
 * Obtiene los miembros del equipo por defecto
 * 
 * @returns Array de miembros del equipo
 * @example
 * ```tsx
 * const teamMembers = getDefaultTeamMembers();
 * ```
 */
export const getDefaultTeamMembers = (): TeamMember[] => [
  {
    name: 'Alvaro Gatica',
    role: 'La cabeza del equipo',
    avatar: '👨‍💻'
  },
  {
    name: 'Pedro Ascui',
    role: 'La creatividad del equipo',
    avatar: '👨‍💻'
  },
  {
    name: 'Felipe Caroca',
    role: 'Bailarín del frontend',
    avatar: '👨‍💻'
  }
];

/**
 * Obtiene las características por defecto
 * 
 * @returns Array de características
 * @example
 * ```tsx
 * const features = getDefaultFeatures();
 * ```
 */
export const getDefaultFeatures = (): Feature[] => [
  {
    title: 'React 18',
    description: 'Última versión con hooks avanzados',
    icon: '⚛️'
  },
  {
    title: 'TypeScript',
    description: 'Tipado estático para mejor desarrollo',
    icon: '📘'
  },
  {
    title: 'Vite',
    description: 'Build tool ultra rápido',
    icon: '⚡'
  },
  {
    title: 'Tailwind CSS',
    description: 'Framework CSS utility-first',
    icon: '🎨'
  }
];

/**
 * Genera un saludo personalizado
 * 
 * @param name - Nombre de la persona
 * @returns Saludo personalizado
 * @example
 * ```tsx
 * const greeting = generateGreeting('Felipe');
 * // Returns: "¡Hola Felipe! Bienvenido al equipo Frontend"
 * ```
 */
export const generateGreeting = (name: string): string => {
  return `¡Hola ${name}! Bienvenido al equipo Frontend`;
};
