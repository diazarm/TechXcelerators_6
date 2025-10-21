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
  Map,
  Database,
  Crosshair,
  TrendingUp,
  Briefcase,
} from 'react-feather';
import { 
  createSemiboldIcon,
  createMultipleIcons
} from './iconFactory';
import { SECTION_IDS } from './sectionMapping';




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
  resourceId?: string; // ID fijo del recurso (nunca cambia)
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
    sectionType: SECTION_IDS.ALIANZA,
    resourceName: 'Portafolio y Precios',
    resourceId: '68c22af480f85343fb2bf920'
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
    sectionType: SECTION_IDS.ALIANZA,
    resourceName: 'Fichas técnicas y Grabaciones de capacitación en producto',
    resourceId: '68cae80754f9344f27defc8b'
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
    sectionType: SECTION_IDS.ALIANZA,
    resourceName: 'USP',
    resourceId: '68cae87f54f9344f27defc8d'
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
    sectionType: SECTION_IDS.ALIANZA,
    resourceName: 'Estructura organizacional de equipo de trabajo (Organigrama)',
    resourceId: '68cae8c154f9344f27defc8f'
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
    sectionType: SECTION_IDS.ALIANZA,
    resourceName: 'Directorio de contactos de la alianza',
    resourceId: '68caf0e66e22346e481f8c72',
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
    sectionType: SECTION_IDS.ALIANZA,
    resourceName: 'Resumen de Contrato',
    resourceId: '68caf1f86e22346e481f8c7c',
    showModal: true
  }
];

export const gobernanzaPageCards: CardConfig[] = [
  {
    id: 'acta-colaboracion',
    title: 'Actas de comité de colaboración',
    description: '',
    leftHeaderContent: createSemiboldIcon(Users, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.GOBERNANZA,
    resourceName: 'Actas de comité de colaboración',
    resourceId: '68caf35e6e22346e481f8c86',
    showModal: true,
    isActive: true
  },
  {
    id: 'acta-direccion',
    title: 'Actas de comité de dirección',
    description: '',
    leftHeaderContent: createSemiboldIcon(FileText, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.GOBERNANZA,
    resourceName: 'Actas de comité de dirección',
    resourceId: '68caf4586e22346e481f8c90',
    showModal: true,
    isActive: true
  },
  {
    id: 'acta-estrategia',
    title: 'Actas de comité de estrategia y crecimiento',
    description: '',
    leftHeaderContent: createSemiboldIcon(Edit, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.GOBERNANZA,
    resourceName: 'Actas de comité de estrategia y crecimiento',
    resourceId: '68caf4f56e22346e481f8c9a',
    showModal: true,
    isActive: true
  },
  {
    id: 'grabaciones',
    title: 'Grabación de los comités',
    description: '',
    leftHeaderContent: createSemiboldIcon(Video, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.GOBERNANZA,
    resourceName: 'Grabación de los comités',
    resourceId: '68caf5876e22346e481f8ca4',
    isActive: true
  },
  {
    id: 'presentaciones',
    title: 'Presentaciones de comités',
    description: '',
    leftHeaderContent: createSemiboldIcon(Cast, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.GOBERNANZA,
    resourceName: 'Presentaciones de comités',
    resourceId: '68caf5fe6e22346e481f8ca7',
    isActive: true
  }
];

// Cards para la página Gestión (6 cards)
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
    sectionType: SECTION_IDS.GESTION,
    resourceName: 'Tablero PBI Ventas',
    resourceId: '68cb1a93e7461e967e34e09f',
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
    sectionType: SECTION_IDS.GESTION,
    resourceName: 'Tablero PBI éxito estudiantil',
    resourceId: '68cb238de7461e967e34e0aa',
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
    sectionType: SECTION_IDS.GESTION,
    resourceName: 'Calendario académico de las alianzas',
    resourceId: '68cb2547e7461e967e34e0ca'
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
    sectionType: SECTION_IDS.GESTION,
    resourceName: 'Tablero PBI gestión docente',
    resourceId: '68cb2443e7461e967e34e0b5',
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
    sectionType: SECTION_IDS.GESTION,
    resourceName: 'Tablero PBI experiencia',
    resourceId: '68cb24e5e7461e967e34e0bf',
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
    sectionType: SECTION_IDS.GESTION,
    resourceName: 'Calendario operacional',
    resourceId: '68cb2745e7461e967e34e0cd',
    showModal: true
  }
];

// Cards para la página Iniciativas (2 cards)
export const iniciativasPageCards: CardConfig[] = [
  {
    id: 'planes-accion',
    title: 'Master plan',
    description: 'Plan estrategico a largo plazo con los ejes principales',
    leftHeaderContent: createSemiboldIcon(Map, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.INICIATIVAS,
    resourceName: 'Masterplan',
    resourceId: '68cb27fae7461e967e34e0d8',
    showModal: true
  },
  {
    id: 'seguimiento-resultados',
    title: 'Plan de excelencia operativa en 360 / 2025',
    description: 'Compromiso con la innovación, calidad y sostenibilidad',
    leftHeaderContent: createSemiboldIcon(Star, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.INICIATIVAS,
    resourceName: 'Plan de excelencia operativa en 360 - 2025',
    resourceId: '68cb2880e7461e967e34e0db',
    showModal: true
  }
];

// Cards para la página Planeación (4 cards)
export const planeacionPageCards: CardConfig[] = [
  {
    id: 'budget',
    title: 'Budget',
    description: '',
    leftHeaderContent: createSemiboldIcon(Database, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.PLANEACION,
    resourceName: 'Budget',
    resourceId: '68caf67c6e22346e481f8caa'
  },
  {
    id: 'proyeccion-crecimiento',
    title: 'Proyección de crecimiento de la alianza con su portafolio',
    description: '',
    leftHeaderContent: createSemiboldIcon(Crosshair, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.PLANEACION,
    resourceName: 'Proyección de crecimiento de la alianza con su portafolio',
    resourceId: '68caf7e56e22346e481f8cad'
  },
  {
    id: 'estudios-viabilidad',
    title: 'Estudios de viabilidad y factibilidad',
    description: '',
    leftHeaderContent: createSemiboldIcon(TrendingUp, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.PLANEACION,
    resourceName: 'Estudios de viabilidad y factibilidad',
    resourceId: '68caf8246e22346e481f8cb0'
  },
  {
    id: 'aprobacion-portafolio',
    title: 'Aprobación de portafolio por alianza',
    description: '',
    leftHeaderContent: createSemiboldIcon(Briefcase, 32, '#1E285F'),
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: SECTION_IDS.PLANEACION,
    resourceName: 'Aprobación de portafolio por alianza',
    resourceId: '68caf83c6e22346e481f8cb3'
  }
];

// Cards para la página Galeria (9 cards de universidades)
export const galeriaPageCards: CardConfig[] = [
  {
    id: 'eafit-gallery',
    title: 'EAFIT',
    description: 'Universidad EAFIT',
    image: '/img/EAFIT_GALERIA.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'EAFIT',
    resourceId: '68cb2978e7461e967e34e0df',
    showModal: true
  },
  {
    id: 'uninorte-gallery',
    title: 'UNINORTE',
    description: 'Universidad Del Norte',
    image: '/img/UniNorte_Galeria.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'Uninorte',
    resourceId: '68cb2986e7461e967e34e0e2',
    showModal: true
  },
  {
    id: 'unab-gallery',
    title: 'UNAB',
    description: 'Universidad Andres Bello',
    image: '/img/UNAB.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'UNAB',
    showModal: true
  },
  {
    id: 'udd-gallery',
    title: 'UDD',
    description: 'Universidad del Desarrollo',
    image: '/img/UDD_GALERIA.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'UDD',
    showModal: true
  },
  {
    id: 'central-gallery',
    title: 'CENTRAL',
    description: 'Universidad Central',
    image: '/img/UC.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'Central',
    showModal: true
  },
  {
    id: 'unis-gallery',
    title: 'UNIS',
    description: 'Universidad del Istmo',
    image: '/img/UNIS_GALERIA.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'UNIS',
    showModal: true
  },
  {
    id: 'up-gallery',
    title: 'UP',
    description: 'Universidad Panamericana',
    image: '/img/UP.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'UP',
    showModal: true
  },
  {
    id: 'ucss-gallery',
    title: 'UCSS',
    description: 'Universidad Católica Sedes Sapientiae',
    image: '/img/UCSS.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'UCSS',
    showModal: true
  },
  {
    id: 'uac-gallery',
    title: 'UAC',
    description: 'Universidad Andina del Cusco',
    image: '/img/UAC.png',
    rightHeaderContent: createMultipleIcons([
      { component: EyeOff, size: 18, color: '#5D5A88', withCircle: true, type: 'delete' },
      { component: Edit2, size: 18, color: '#5D5A88', withCircle: true, type: 'edit' }
    ]),
    sectionType: '68cadd9354f9344f27defc83',
    resourceName: 'UAC',
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
  gestion: gestionPageCards,
  planeacion: planeacionPageCards,
  iniciativas: iniciativasPageCards,
  galeria: galeriaPageCards
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

