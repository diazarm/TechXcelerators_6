/**
 * Mock data para Alianzas
 * Basado en la estructura del backend: name, siglas, url?, isActive, deleteAt, timestamps
 */

import type { Alliance } from '../types/alliance';

/**
 * Datos de prueba para alianzas
 * Incluye alianzas activas, inactivas y con soft delete
 */
export const mockAlliances: Alliance[] = [
  // Alianzas activas
  {
    _id: '1',
    name: 'Universidad EAFIT',
    siglas: 'EAFIT',
    url: 'https://www.eafit.edu.co',
    isActive: true,
    deleteAt: null,
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    _id: '2',
    name: 'Universidad de Antioquia',
    siglas: 'UDEA',
    url: 'https://www.udea.edu.co',
    isActive: true,
    deleteAt: null,
    createdAt: new Date('2024-01-20T14:30:00Z'),
    updatedAt: new Date('2024-01-20T14:30:00Z')
  },
  {
    _id: '3',
    name: 'Universidad Nacional de Colombia',
    siglas: 'UNAL',
    url: 'https://www.unal.edu.co',
    isActive: true,
    deleteAt: null,
    createdAt: new Date('2024-02-01T09:15:00Z'),
    updatedAt: new Date('2024-02-01T09:15:00Z')
  },
  {
    _id: '4',
    name: 'Universidad Pontificia Bolivariana',
    siglas: 'UPB',
    url: 'https://www.upb.edu.co',
    isActive: true,
    deleteAt: null,
    createdAt: new Date('2024-02-10T16:45:00Z'),
    updatedAt: new Date('2024-02-10T16:45:00Z')
  },
  {
    _id: '5',
    name: 'Instituto Tecnológico Metropolitano',
    siglas: 'ITM',
    url: 'https://www.itm.edu.co',
    isActive: true,
    deleteAt: null,
    createdAt: new Date('2024-02-15T11:20:00Z'),
    updatedAt: new Date('2024-02-15T11:20:00Z')
  },
  
  // Alianza inactiva (sin soft delete)
  {
    _id: '6',
    name: 'Universidad CES',
    siglas: 'CES',
    url: 'https://www.ces.edu.co',
    isActive: false,
    deleteAt: null,
    createdAt: new Date('2024-01-25T13:00:00Z'),
    updatedAt: new Date('2024-03-01T08:30:00Z')
  },
  
  // Alianzas con soft delete
  {
    _id: '7',
    name: 'Universidad de Medellín',
    siglas: 'UDEM',
    url: 'https://www.udem.edu.co',
    isActive: false,
    deleteAt: new Date('2024-03-10T12:00:00Z'),
    createdAt: new Date('2024-02-05T15:30:00Z'),
    updatedAt: new Date('2024-03-10T12:00:00Z')
  },
  {
    _id: '8',
    name: 'Corporación Universitaria Lasallista',
    siglas: 'CUL',
    url: 'https://www.lasallista.edu.co',
    isActive: false,
    deleteAt: new Date('2024-03-15T10:15:00Z'),
    createdAt: new Date('2024-02-20T09:45:00Z'),
    updatedAt: new Date('2024-03-15T10:15:00Z')
  }
];

/**
 * Función para obtener solo alianzas activas (sin soft delete)
 * Simula el filtro del backend: isActive: true, deleteAt: null
 */
export const getActiveAlliances = (): Alliance[] => {
  return mockAlliances.filter(alliance => 
    alliance.isActive === true && alliance.deleteAt === null
  );
};

/**
 * Función para obtener alianzas eliminadas (con soft delete)
 * Simula el filtro del backend: deleteAt !== null
 */
export const getDeletedAlliances = (): Alliance[] => {
  return mockAlliances.filter(alliance => alliance.deleteAt !== null);
};

/**
 * Función para obtener alianzas inactivas (sin soft delete)
 * Simula el filtro del backend: isActive: false, deleteAt: null
 */
export const getInactiveAlliances = (): Alliance[] => {
  return mockAlliances.filter(alliance => 
    alliance.isActive === false && alliance.deleteAt === null
  );
};
