import type { User, LoginCredentials } from '../types';
import type { FieldValidation } from '../types/validation';
import { errorService, logger, validationService, ValidationRules } from './index';

/** Servicio de autenticación con manejo robusto de errores */

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

// Simular delay de red con posibilidad de error
const simulateNetworkDelay = (ms: number = 1000, shouldFail: boolean = false): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Error de red simulado'));
      } else {
        resolve();
      }
    }, ms);
  });
};

// Validación de credenciales según tipo de acceso
const validateLoginCredentials = (credentials: LoginCredentials, accessType: 'user' | 'admin'): void => {
  const fields: Record<string, FieldValidation> = {
    email: {
      field: 'email',
      required: true,
      rules: [ValidationRules.email()],
      requiredMessage: 'El email es requerido'
    }
  };

  // Solo validar contraseña para administradores
  if (accessType === 'admin') {
    fields.password = {
      field: 'password',
      required: true,
      rules: [ValidationRules.minLength(6)],
      requiredMessage: 'La contraseña es requerida'
    };
  }

  const validation = validationService.validateForm(credentials as unknown as Record<string, unknown>, {
    fields
  });

  if (!validation.isValid) {
    const errors = Object.values(validation.fieldErrors).flat();
    throw errorService.createBusinessError(
      'VALIDATION',
      `Errores de validación: ${errors.join(', ')}`
    );
  }
};

/** Iniciar sesión del usuario */
export const login = async (credentials: LoginCredentials, accessType: 'user' | 'admin' = 'admin'): Promise<{ user: User; token: string }> => {
  try {
    logger.info('Iniciando proceso de login', { email: credentials.email }, 'AuthService');
    
    // Validar credenciales según tipo de acceso
    validateLoginCredentials(credentials, accessType);
    
    // TODO: Cuando el backend esté listo, usar:
    // const response = await apiMethods.post('/auth/login', credentials);
    // return response.data;
    
    // Por ahora mantenemos la simulación con manejo de errores
    await simulateNetworkDelay(1000, Math.random() < 0.1); // 10% de probabilidad de fallo
    
    // Simular validación del backend
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw errorService.createBusinessError(
        'AUTH',
        'Credenciales inválidas',
        'Verifica tu email y contraseña'
      );
    }

    // Verificar que el tipo de usuario coincida con el tipo de acceso
    if (user.role !== accessType) {
      throw errorService.createBusinessError(
        'AUTH',
        'Acceso denegado',
        `Este usuario es de tipo ${user.role}, pero intentas acceder como ${accessType}`
      );
    }
    
    // Verificar contraseña solo para admin
    if (accessType === 'admin' && credentials.password !== 'password123') {
      throw errorService.createBusinessError(
        'AUTH',
        'Credenciales inválidas',
        'Verifica tu email y contraseña'
      );
    }
    
    // Simular token JWT
    const token = `mock-jwt-${user.id}-${Date.now()}`;
    
    // Actualizar último login
    user.lastLogin = new Date().toISOString();
    
    logger.info('Login exitoso', { userId: user.id, email: user.email }, 'AuthService');
    
    return { user, token };
  } catch (error) {
    logger.error('Error en login', { 
      email: credentials.email, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'AuthService');
    
    throw errorService.handleError(error, 'AuthService');
  }
};

/** Verificar si un token es válido */
export const validateToken = async (token: string): Promise<User> => {
  try {
    logger.debug('Validando token', { tokenLength: token.length }, 'AuthService');
    
    if (!token) {
      throw errorService.createBusinessError('AUTH', 'Token no proporcionado');
    }
    
    await simulateNetworkDelay(500, Math.random() < 0.05); // 5% de probabilidad de fallo
    
    // Simular validación de token
    if (!token.startsWith('mock-jwt-')) {
      throw errorService.createBusinessError('AUTH', 'Token inválido');
    }
    
    // Extraer ID del usuario del token simulado
    const userId = token.split('-')[2];
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw errorService.createBusinessError('AUTH', 'Usuario no encontrado');
    }
    
    logger.debug('Token validado exitosamente', { userId: user.id }, 'AuthService');
    
    return user;
  } catch (error) {
    logger.error('Error validando token', { 
      tokenLength: token.length,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'AuthService');
    
    throw errorService.handleError(error, 'AuthService');
  }
};

/** Cerrar sesión del usuario */
export const logout = async (): Promise<void> => {
  try {
    logger.info('Iniciando proceso de logout', {}, 'AuthService');
    
    await simulateNetworkDelay(300, Math.random() < 0.02); // 2% de probabilidad de fallo
    
    // Simular limpieza en el backend
    logger.info('Sesión cerrada exitosamente', {}, 'AuthService');
  } catch (error) {
    logger.error('Error en logout', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'AuthService');
    
    // No lanzar error en logout para no bloquear al usuario
    logger.warn('Logout falló pero se continuará con la limpieza local', {}, 'AuthService');
  }
};

/**
 * Obtener información del usuario actual
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    logger.debug('Obteniendo usuario actual', {}, 'AuthService');
    
    await simulateNetworkDelay(200, Math.random() < 0.03); // 3% de probabilidad de fallo
    
    // Simular que no hay usuario logueado por defecto
    logger.debug('No hay usuario logueado', {}, 'AuthService');
    return null;
  } catch (error) {
    logger.error('Error obteniendo usuario actual', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'AuthService');
    
    // Retornar null en caso de error para no bloquear la aplicación
    return null;
  }
};

/**
 * Refrescar token de autenticación
 */
export const refreshToken = async (token: string): Promise<string> => {
  try {
    logger.debug('Refrescando token', { tokenLength: token.length }, 'AuthService');
    
    await simulateNetworkDelay(800, Math.random() < 0.08); // 8% de probabilidad de fallo
    
    // Simular refresh de token
    const newToken = `mock-jwt-refreshed-${Date.now()}`;
    
    logger.debug('Token refrescado exitosamente', {}, 'AuthService');
    
    return newToken;
  } catch (error) {
    logger.error('Error refrescando token', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'AuthService');
    
    throw errorService.handleError(error, 'AuthService');
  }
};
