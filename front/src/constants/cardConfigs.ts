import React from 'react';
import { 
  Star, 
  Users, 
  Edit, 
  Globe, 
  Zap, 
  Image,
  FileText,
  Settings
} from 'react-feather';

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
    description: 'Información básica del acuerdo de la alianza, información del ADN de la alianza y portafolio activo',
    icon: React.createElement(Star, { size: 24 }),
    href: '/nueva-alianza'
  },
  {
    id: 'gobernanza',
    title: 'Gobernanza',
    description: 'Equipo de trabajo, actas, grabaciones y presentaciones de comités',
    icon: React.createElement(Users, { size: 24 }),
    href: '/gobernanza'
  },
  {
    id: 'planeacion',
    title: 'Planeación',
    description: 'Metas proyectadas más desarrollo de productos',
    icon: React.createElement(Edit, { size: 24 }),
    href: '/planeacion'
  },
  {
    id: 'gestion',
    title: 'Gestión',
    description: 'Power Bi de resultados más calendario académico',
    icon: React.createElement(Globe, { size: 24 }),
    href: '/gestion'
  },
  {
    id: 'iniciativas',
    title: 'Iniciativas',
    description: 'Planes de acción con las alianzas internas',
    icon: React.createElement(Zap, { size: 24 }),
    href: '/iniciativas'
  },
  {
    id: 'galeria',
    title: 'Galeria de fotos e hitos de la alianza',
    description: '',
    icon: React.createElement(Image, { size: 24 }),
    href: '/galeria'
  }
];

// Cards para la página Recursos (3 cards)
export const recursosPageCards: CardConfig[] = [
  {
    id: 'documentos',
    title: 'Documentos',
    description: 'Acceso a documentos corporativos, políticas y procedimientos actualizados.',
    icon: React.createElement(FileText, { size: 24 }),
    href: '/documentos'
  },
  {
    id: 'equipo',
    title: 'Equipo',
    description: 'Gestión de equipos de trabajo y asignación de responsabilidades.',
    icon: React.createElement(Users, { size: 24 }),
    href: '/equipo'
  },
  {
    id: 'configuracion',
    title: 'Configuración',
    description: 'Configuración del sistema y preferencias de usuario.',
    icon: React.createElement(Settings, { size: 24 }),
    href: '/configuracion'
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
  recursos: recursosPageCards
} as const;

/**
 * Obtener configuración de tarjetas por tipo de página
 * 
 * @param pageType - Tipo de página
 * @returns Array de configuración de tarjetas
 */
export const getCardConfig = (pageType: keyof typeof cardConfigs): CardConfig[] => {
  return cardConfigs[pageType] || [];
};
