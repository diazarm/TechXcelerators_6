import type { User, LoginCredentials } from '../../types';

/**
 * Servicio de autenticación
 * 
 * Este servicio maneja todas las operaciones de autenticación:
 * - Login/logout
 * - Validación de tokens
 * - Gestión de sesión
 * 
 * Usa Axios con interceptores para JWT automático
 */

// Usuarios simulados para testing
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Administrador',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLogin: '2024-01-15T10:30:00.000Z'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Usuario Normal',
    role: 'user',
    createdAt: '2024-01-02T00:00:00.000Z',
    lastLogin: '2024-01-14T15:45:00.000Z'
  }
];

// Simular delay de red
const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Iniciar sesión del usuario
 */
export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  // TODO: Cuando el backend esté listo, usar:
  // const response = await api.post('/auth/login', credentials);
  // return response.data;
  
  // Por ahora mantenemos la simulación
  await simulateNetworkDelay();
  
  // Simular validación del backend
  const user = mockUsers.find(u => u.email === credentials.email);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  if (credentials.password !== 'password123') {
    throw new Error('Contraseña incorrecta');
  }
  
  // Simular token JWT
  const token = `mock-jwt-${user.id}-${Date.now()}`;
  
  // Actualizar último login
  user.lastLogin = new Date().toISOString();
  
  return { user, token };
};

/**
 * Verificar si un token es válido
 */
export const validateToken = async (token: string): Promise<User> => {
  await simulateNetworkDelay(500);
  
  // Simular validación de token
  if (!token.startsWith('mock-jwt-')) {
    throw new Error('Token inválido');
  }
  
  // Extraer ID del usuario del token simulado
  const userId = token.split('-')[2];
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  
  return user;
};

/**
 * Cerrar sesión del usuario
 */
export const logout = async (): Promise<void> => {
  await simulateNetworkDelay(300);
  // Simular limpieza en el backend
  console.log('Sesión cerrada en el backend');
};

/**
 * Obtener información del usuario actual
 */
export const getCurrentUser = async (): Promise<User | null> => {
  await simulateNetworkDelay(200);
  
  // Simular que no hay usuario logueado por defecto
  return null;
};
