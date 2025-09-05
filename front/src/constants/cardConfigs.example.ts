import React from 'react';
import { Shield, FileText, Users, Settings, BarChart, Calendar } from 'react-feather';

// ========================================
// ARCHIVO DE EJEMPLO - NO USAR EN PRODUCCIÓN
// ========================================
// Este archivo es solo un ejemplo para que puedan ver la estructura
// Debes crear el archivo cardConfigs.ts real basado en este ejemplo

export interface CardConfig {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

// ========================================
// EJEMPLO PARA DASHBOARD (página principal)
// ========================================
// ========================================
// CONFIGURACIÓN DE CARDS POR PÁGINA
// ========================================

// Cards para la página Dashboard (6 cards)
export const dashboardPageCards: CardConfig[] = [
  {
    id: 'governance',
    title: 'Gobernanza Estratégica',
    description: 'Gestión y coordinación de comités ejecutivos para la toma de decisiones estratégicas.',
    icon: React.createElement(Shield, { size: 24 }),
    href: '/governance'
  },
  {
    id: 'documents',
    title: 'Documentos',
    description: 'Acceso a documentos corporativos, políticas y procedimientos actualizados.',
    icon: React.createElement(FileText, { size: 24 }),
    href: '/documents'
  },
  {
    id: 'team',
    title: 'Equipo',
    description: 'Gestión de equipos de trabajo y asignación de responsabilidades.',
    icon: React.createElement(Users, { size: 24 }),
    href: '/team'
  },
  {
    id: 'settings',
    title: 'Configuración',
    description: 'Configuración del sistema y preferencias de usuario.',
    icon: React.createElement(Settings, { size: 24 }),
    href: '/settings'
  },
  {
    id: 'analytics',
    title: 'Analíticas',
    description: 'Reportes y métricas de rendimiento del sistema.',
    icon: React.createElement(BarChart, { size: 24 }),
    href: '/analytics'
  },
  {
    id: 'calendar',
    title: 'Calendario',
    description: 'Gestión de eventos, reuniones y cronogramas.',
    icon: React.createElement(Calendar, { size: 24 }),
    href: '/calendar'
  }
];

// Cards para la página Recursos (3 cards)
export const recursosPageCards: CardConfig[] = [
  {
    id: 'tutorials',
    title: 'Tutoriales',
    description: 'Guías paso a paso para usar el sistema.',
    icon: React.createElement(FileText, { size: 24 }), // Usar icono disponible
    href: '/tutorials'
  },
  {
    id: 'faq',
    title: 'Preguntas Frecuentes',
    description: 'Respuestas a las dudas más comunes.',
    icon: React.createElement(FileText, { size: 24 }), // Usar icono disponible
    href: '/faq'
  },
  {
    id: 'support',
    title: 'Soporte',
    description: 'Contacta con nuestro equipo de soporte.',
    icon: React.createElement(FileText, { size: 24 }), // Usar icono disponible
    href: '/support'
  }
];


// ========================================
// GUÍA  - DASHBOARD CON 6 CARDS

// ========================================
// CÓMO FUNCIONA TODO:
// ========================================

// 1. El Archivo de Configuración (cardConfigs.ts)
// Este es el almacén de datos. Aquí se define:
// - La estructura de las tarjetas: Cada tarjeta debe tener un título, una descripción, etc.
// - Las listas de tarjetas por página: Se crean listas separadas, como dashboardPageCards (para la página principal) y recursosPageCards (para la página de recursos).
// - El índice general: cardConfigs es un objeto que agrupa todas esas listas. Funciona como un mapa que dice: "para la clave dashboard, usa la lista de dashboardPageCards".

// 2. El "Hook" (useCards.ts)
// El useCards es la herramienta mágica que conecta todo. Su trabajo es:
// - Recibir una instrucción: Le dices qué página necesitas (por ejemplo, useCards('dashboard')).
// - Buscar en el almacén: Va al archivo de configuración (cardConfigs.ts) y busca la lista de tarjetas que corresponde a la página que le indicaste. Por ejemplo, al recibir 'dashboard', busca cardConfigs.dashboard.
// - Entregar la lista: Devuelve la lista específica de tarjetas que encontraste, lista para ser usada.

// 3. La Página (ej: Dashboard.tsx)
// Esta es la parte que muestra las tarjetas. Es donde todo se junta:
// - Pide las tarjetas: Llama al "hook" (useCards('dashboard')) y le pide las tarjetas para la página principal.
// - Recibe las tarjetas: El hook le entrega la lista de 6 tarjetas (dashboardPageCards).
// - Las muestra: La página usa esta lista para renderizar y mostrar las tarjetas en la pantalla, ya con su título, descripción e ícono.

// En resumen: El archivo de configuración guarda los datos para todas las tarjetas. El hook los filtra según la página que necesites. Y la página los usa para mostrarlos.

// ========================================
// PASOS A SEGUIR:
// ========================================

// PASO 1: Crear cardConfigs.ts
// 1. Crear archivo: src/constants/cardConfigs.ts
// 2. Crear la estructura de las cards. (ver ejemplo)

// PASO 2: Arreglar useCards.ts
// Abrir: src/hooks/useCards.ts
// Agregar: import { cardConfigs } from '../constants/cardConfigs';
// Cambiar: return cardConfigs[pageType] || [];


// PASO 3: Exportar
// Abrir: src/constants/index.ts
// Agregar: export * from './cardConfigs';

// PASO 4: Crear Dashboard
// Crear: src/pages/Dashboard/index.tsx
// Código:
// import React from 'react';
// import { CardGrid } from '../../components';
// import { useCards } from '../../hooks';
//
// const Dashboard = () => {
//   const { cards, handleCardClick } = useCards('dashboard');
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <CardGrid cards={cards} onCardClick={handleCardClick} />
//     </div>
//   );
// };
// export default Dashboard;

// ========================================
// ¡LISTO! 🎉
// ========================================
// Ahora tienes Dashboard con 6 cards que se adaptan al tamaño de pantalla

