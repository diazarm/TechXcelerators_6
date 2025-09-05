
import type { SearchResult } from '../types';

export const mockSearchData: SearchResult[] = [
    {
      id: '1',
      title: 'Presentación Estratégica Q1 2024',
      description: 'Slides de la reunión estratégica del primer trimestre con objetivos Central',
      category: 'CENTRAL',
      path: 'CENTRAL • Presentaciones',
      type: 'Documento',
      keywords: ['pre', 'estratégica', 'q1']
    },
    {
      id: '2',
      title: 'Dashboard de Indicadores Financieros',
      description: 'Tablero interactivo con métricas financieras y presupuestarias',
      category: 'CENTRAL',
      path: 'CENTRAL • Finanzas',
      type: 'Dashboard',
      keywords: ['dashboard', 'financiero', 'indicadores']
    },
    {
      id: '3',
      title: 'Plan de Expansión Geográfica Central',
      description: 'Estrategia para expandir la presencia de la alianza central en nuevas regiones',
      category: 'CENTRAL',
      path: 'CENTRAL • Planes de Expansión',
      type: 'Planeación',
      keywords: ['plan', 'expansión', 'geográfica']
    }
    // Puedes agregar más según necesites
  ];