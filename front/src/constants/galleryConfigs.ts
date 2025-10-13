/**
 * Configuración de cards para la página de Galería
 * 
 * Centraliza la configuración de cards de la galería siguiendo
 * el patrón establecido en el proyecto para configuraciones.
 */

import type { CardConfig } from './cardConfigs';

/**
 * Configuración de cards de la galería
 * Organizadas en filas de 3 cards cada una
 */
export const galleryCards: CardConfig[] = [
  // Primera fila
  { 
    id: 'eafit', 
    title: 'EAFIT', 
    description: 'Universidad EAFIT',
    image: '/img/EAFIT_GALERIA.png',
    href: 'https://www.eafit.edu.co',
    resourceName: 'EAFIT',
    rightHeaderContent: true,
    isActive: true
  },
  { 
    id: 'uninorte', 
    title: 'UNINORTE', 
    description: 'Universidad del Norte',
    image: '/img/UniNorte.png',
    href: 'https://www.uninorte.edu.co',
    resourceName: 'UNINORTE',
    rightHeaderContent: true,
    isActive: true
  },
  { 
    id: 'unab', 
    title: 'UNAB', 
    description: 'Universidad Andrés Bello',
    image: '/img/UNAB.png',
    href: 'https://www.unab.cl',
    resourceName: 'UNAB',
    rightHeaderContent: true,
    isActive: true
  },
  
  // Segunda fila
  { 
    id: 'uc', 
    title: 'CENTRAL', 
    description: 'Universidad Central',
    image: '/img/UC.png',
    href: 'https://www.ucentral.cl',
    resourceName: 'CENTRAL',
    rightHeaderContent: true,
    isActive: true
  },
  { 
    id: 'unis2', 
    title: 'UNIS', 
    description: 'Universidad del Istmo',
    image: '/img/UNIS_GALERIA.png',
    href: 'https://unis.edu.gt',
    resourceName: 'UNIS',
    rightHeaderContent: true,
    isActive: true
  },
  { 
    id: 'udd', 
    title: 'UDD', 
    description: 'Universidad del Desarrollo',
    image: '/img/UDD_GALERIA.png',
    href: 'https://www.udd.cl',
    resourceName: 'UDD',
    rightHeaderContent: true,
    isActive: true
  },
  
  // Tercera fila
  { 
    id: 'uac', 
    title: 'UAC', 
    description: 'Universidad Autónoma del Cusco',
    image: '/img/UAC.png',
    href: 'https://www.uandina.edu.pe',
    resourceName: 'UAC',
    rightHeaderContent: true,
    isActive: true
  },
  { 
    id: 'up', 
    title: 'UP', 
    description: 'Universidad Panamericana',
    image: '/img/UP.png',
    href: 'https://www.up.edu.mx',
    resourceName: 'UP',
    rightHeaderContent: true,
    isActive: true
  },
  { 
    id: 'ucss', 
    title: 'UCSS', 
    description: 'Universidad Católica Sedes Sapientiae',
    image: '/img/UCSS.png',
    href: 'https://www.ucss.edu.pe',
    resourceName: 'UCSS',
    rightHeaderContent: true,
    isActive: true
  }
];
