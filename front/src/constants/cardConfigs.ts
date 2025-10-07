import React from 'react';
import { 
  Star,
  Video,
  Zap,
  Users,
  Globe,
  Cast,
  FileText,
  Edit,
  EyeOff,
  Edit2,
  Map,
} from 'react-feather';


/**
 * Función para crear iconos con componente específico y escalado
 */
const createIcon = (IconComponent: React.ComponentType<{ size: number; color?: string }>, baseSize: number, color?: string) => {
  return React.createElement('div', {
    className: "flex items-center justify-center",
    style: {
      width: `${baseSize}px`,
      height: `${baseSize}px`
    }
  }, React.createElement(IconComponent, {
    size: baseSize,
    color: color || '#585D8A'
  }));
};

/**
 * Función para crear iconos semibold
 */
const createSemiboldIcon = (IconComponent: React.ComponentType<{ size: number; color?: string; strokeWidth?: number }>, baseSize: number, color?: string) => {
  return React.createElement('div', {
    className: "flex items-center justify-center",
    style: {
      width: `${baseSize}px`,
      height: `${baseSize}px`
    }
  }, React.createElement(IconComponent, {
    size: baseSize,
    color: color || '#585D8A',
    strokeWidth: 1.5 // Menos peso visual
  }));
};

/**
 * Función para crear iconos con círculo sutil
 */
const createIconWithCircle = (IconComponent: React.ComponentType<{ size: number; color?: string }>, baseSize: number, color?: string) => {
  return React.createElement('div', {
    className: "flex items-center justify-center rounded-full border border-gray-200",
    style: {
      width: `${baseSize + 12}px`, // Aumentado de 8 a 12
      height: `${baseSize + 12}px`, // Aumentado de 8 a 12
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
  }, React.createElement(IconComponent, {
    size: baseSize,
    color: color || '#5D5A88'
  }));
};

/**
 * Función para crear múltiples iconos en un contenedor con escalado
 */
const createMultipleIcons = (icons: Array<{ component: React.ComponentType<{ size: number; color?: string; strokeWidth?: number }>, size: number, color?: string, withCircle?: boolean }>, gap: number = 8) => {
  return React.createElement('div', { 
    style: { display: 'flex', gap: `${gap}px`, alignItems: 'center' } 
  }, icons.map((icon) => 
    icon.withCircle ? createIconWithCircle(icon.component, icon.size, icon.color) : createIcon(icon.component, icon.size, icon.color)
  ));
};

/**
 * Configuración de Tarjetas
 * 
 * Configuración centralizada de tarjetas para diferentes páginas.
 * Define el contenido, iconos y comportamiento de cada tarjeta.
 */

export interface CardConfig {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  leftHeaderContent?: React.ReactNode;
  rightHeaderContent?: React.ReactNode;
  image?: string;
  href?: string;
  onClick?: () => void;
}

// ========================================
// CONFIGURACIÓN DE CARDS POR PÁGINA
// ========================================

// Cards para la página Dashboard (6 cards principales)
export const dashboardPageCards: CardConfig[] = [
  {
    id: 'nueva-alianza',
    title: 'Nueva alianza',
    description: 'Información del ADN de la alianza y portafolio activo',
    image: '/img/nuevaAlianza.jpg',
    href: '/alianza'
  },
  {
    id: 'gobernanza',
    title: 'Gobernanzas',
    description: 'Equipo de trabajo, actas, grabaciones y presentaciones de comités',
    image: '/img/gobernanza.jpg',
    href: '/gobernanza'
  },
  {
    id: 'planeacion',
    title: 'Planeación',
    description: 'Metas proyectadas más desarrollo de productos',
    image: '/img/planeacion.jpg',
    href: '/planeacion'
  },
  {
    id: 'gestion',
    title: 'Gestión',
    description: 'Power Bi de resultados más calendario académico',
    image: '/img/gestion.jpg',
    href: '/gestion'
  },
  {
    id: 'iniciativas',
    title: 'Iniciativas',
    description: 'Planes de acción con las alianzas internas',
    image: '/img/iniciativas.jpg',
    href: '/iniciativas'
  },
  {
    id: 'galeria',
    title: 'Galeria de fotos e hitos de la alianza',
    description: '',
    image: '/img/galeria.jpg',
    href: '/galeria'
  }
];

// Cards para la página Alianza (6 cards como en la imagen)
export const alianzaPageCards: CardConfig[] = [
  {
    id: 'portafolio-precios',
    title: 'Portafolio y precios',
    description: '',
    leftHeaderContent: createSemiboldIcon(Star, 32, '#1E285F'), // Más grande y semibold
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true }
    ]),
    href: '/portafolio-precios'
  },
  {
    id: 'fichas-tecnicas',
    title: 'Fichas técnicas y grabaciones de capacitación del producto',
    description: '',
    leftHeaderContent: createSemiboldIcon(Video, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true }
    ]),
    href: '/fichas-tecnicas'
  },
  {
    id: 'usp',
    title: 'USP',
    description: '',
    leftHeaderContent: createSemiboldIcon(Zap, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true }
    ]),
    href: '/usp'
  },
  {
    id: 'organigrama',
    title: 'Organigrama',
    description: '',
    leftHeaderContent: createSemiboldIcon(Users, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true }
    ]),
    href: '/organigrama'
  },
  {
    id: 'directorio-contactos',
    title: 'Directorio de contactos de la alianza',
    description: '',
    leftHeaderContent: createSemiboldIcon(Globe, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true }
    ]),
    href: '/directorio-contactos'
  },
  {
    id: 'resumen-contrato',
    title: 'Resumen de contrato',
    description: '',
    leftHeaderContent: createSemiboldIcon(Edit, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true }
    ]),
    href: '/resumen-contrato'
  }
];

export const gobernanzaPageCards: CardConfig[] = [
  {
    id: 'acta-colaboracion',
    title: 'Acta de comité de colaboración',
    description: '',
    leftHeaderContent: createSemiboldIcon(Users, 32, '#1E285F'),
    href: '/gobernanza/acta-colaboracion'
  },
  {
    id: 'acta-direccion',
    title: 'Acta de comité de dirección',
    description: '',
    leftHeaderContent: createSemiboldIcon(FileText, 32, '#1E285F'),
    href: '/gobernanza/acta-direccion'
  },
  {
    id: 'acta-estrategia',
    title: 'Acta de comité de estrategia y crecimiento',
    description: '',
    leftHeaderContent: createSemiboldIcon(Edit, 32, '#1E285F'),
    href: '/gobernanza/acta-estrategia'
  },
  {
    id: 'grabaciones',
    title: 'Grabación de los comités',
    description: '',
    leftHeaderContent: createSemiboldIcon(Video, 32, '#1E285F'),
    href: '/gobernanza/grabaciones'
  },
  {
    id: 'presentaciones',
    title: 'Presentaciones de comités',
    description: '',
    leftHeaderContent: createSemiboldIcon(Cast, 32, '#1E285F'),
    href: '/gobernanza/presentaciones'
  }
];

// Cards para la página Iniciativas (2 cards)
export const iniciativasPageCards: CardConfig[] = [
  {
    id: 'planes-accion',
    title: 'Master plan',
    description: 'Plan estrategico a largo plazo con los ejes principales',
    leftHeaderContent: createSemiboldIcon(Map, 32, '#1E285F'),
    href: '/iniciativas/planes-accion'
  },
  {
    id: 'seguimiento-resultados',
    title: 'Plan de excelencia operativa en 360 / 2025',
    description: 'Compromiso con la innovación, calidad y sostenibilidad',
    leftHeaderContent: createSemiboldIcon(Star, 32, '#1E285F'),
    href: '/iniciativas/seguimiento-resultados'
  }
];

// ========================================
// CONFIGURACIÓN GENERAL
// ========================================

/**
 * Configuración general de tarjetas por tipo de página
 */
export const cardConfigs = {
  dashboard: dashboardPageCards,
  alianza: alianzaPageCards,
  gobernanza: gobernanzaPageCards,
  iniciativas: iniciativasPageCards
} as const;

/**
 * Tipos de páginas disponibles
 */
export type PageType = keyof typeof cardConfigs;

/**
 * Obtener configuración de tarjetas por tipo de página
 * 
 * @param pageType - Tipo de página
 * @returns Array de configuración de tarjetas
 */
export const getCardConfig = (pageType: PageType): CardConfig[] => {
  return cardConfigs[pageType] || [];
};

