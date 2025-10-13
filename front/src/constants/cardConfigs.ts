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
  BarChart,
  Award,
  BookOpen,
  Book,
  UserPlus,
  Calendar,
} from 'react-feather';
import { 
  createSemiboldIcon,
  createMultipleIcons
} from './iconFactory';




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
  // Identificadores para lógica de alianzas
  sectionType?: string;
  resourceName?: string;
  showModal?: boolean;
  isActive?: boolean;
}

// ========================================
// CONFIGURACIÓN DE CARDS POR PÁGINA
// ========================================

// Cards para la página Dashboard (6 cards principales)
export const dashboardPageCards: CardConfig[] = [
  {
    id: 'nueva-alianza',
    title: 'Nuestra alianza',
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
    leftHeaderContent: createSemiboldIcon(Star, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68c9f2d8d6dbf0c558131e16',
    resourceName: 'Portafolio y Precios'
  },
  {
    id: 'fichas-tecnicas',
    title: 'Fichas técnicas y grabaciones de capacitación del producto',
    description: '',
    leftHeaderContent: createSemiboldIcon(Video, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68c9f2d8d6dbf0c558131e16',
    resourceName: 'Fichas técnicas y Grabaciones de capacitación en producto'
  },
  {
    id: 'usp',
    title: 'USP',
    description: '',
    leftHeaderContent: createSemiboldIcon(Zap, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68c9f2d8d6dbf0c558131e16',
    resourceName: 'USP'
  },
  {
    id: 'organigrama',
    title: 'Organigrama',
    description: '',
    leftHeaderContent: createSemiboldIcon(Users, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68c9f2d8d6dbf0c558131e16',
    resourceName: 'Estructura organizacional de equipo de trabajo (Organigrama)'
  },
  {
    id: 'directorio-contactos',
    title: 'Directorio de contactos de la alianza',
    description: '',
    leftHeaderContent: createSemiboldIcon(Globe, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68c9f2d8d6dbf0c558131e16',
    resourceName: 'Directorio de contactos de la alianza',
    showModal: true
  },
  {
    id: 'resumen-contrato',
    title: 'Resumen de contrato',
    description: '',
    leftHeaderContent: createSemiboldIcon(Edit, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68c9f2d8d6dbf0c558131e16',
    resourceName: 'Resumen de Contrato',
    showModal: true
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

// Cards para la página Gestión (6 cards como en la imagen)
export const gestionPageCards: CardConfig[] = [
  {
    id: 'tablero-pbi-ventas',
    title: 'Tablero PBI ventas',
    description: '',
    leftHeaderContent: createSemiboldIcon(BarChart, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadccc54f9344f27defc7f',
    resourceName: 'Tablero PBI Ventas',
    showModal: true
  },
  {
    id: 'tablero-pbi-exito-estudiantil',
    title: 'Tablero PBI éxito estudiantil',
    description: '',
    leftHeaderContent: createSemiboldIcon(Award, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadccc54f9344f27defc7f',
    resourceName: 'Tablero PBI éxito estudiantil',
    showModal: true
  },
  {
    id: 'calendario-academico-alianzas',
    title: 'Calendario académico de las alianzas',
    description: '',
    leftHeaderContent: createSemiboldIcon(BookOpen, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadccc54f9344f27defc7f',
    resourceName: 'Calendario académico de las alianzas'
    // NO tiene showModal: true porque solo tiene 1 link
  },
  {
    id: 'tablero-pbi-gestion-docente',
    title: 'Tablero PBI gestión docente',
    description: '',
    leftHeaderContent: createSemiboldIcon(Book, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadccc54f9344f27defc7f',
    resourceName: 'Tablero PBI gestión docente',
    showModal: true
  },
  {
    id: 'tablero-pbi-experiencia',
    title: 'Tablero PBI experiencia',
    description: '',
    leftHeaderContent: createSemiboldIcon(UserPlus, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadccc54f9344f27defc7f',
    resourceName: 'Tablero PBI experiencia',
    showModal: true
  },
  {
    id: 'calendario-operacional',
    title: 'Calendario operacional',
    description: '',
    leftHeaderContent: createSemiboldIcon(Calendar, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadccc54f9344f27defc7f',
    resourceName: 'Calendario operacional',
    showModal: true
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
  gestion: gestionPageCards
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

