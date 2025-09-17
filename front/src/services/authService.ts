import type { User, LoginCredentials } from '../types';
import type { FieldValidation } from '../types/validation';
import { errorService, logger, validationService, ValidationRules } from './index';

/** Servicio de autenticación con manejo robusto de errores */

// Usuarios simulados para testing - Estructura del backend
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@example.com',
    password: 'admin123', // Solo admin tiene password
    isActive: true,
    role: 'user', // En backend, admin tiene role 'user' pero isAdmin: true
    isAdmin: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Director',
    email: 'director@example.com',
    isActive: true,
    role: 'director',
    isAdmin: false,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Usuario',
    email: 'user@example.com',
    isActive: true,
    role: 'user',
    isAdmin: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
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

// Validación de credenciales - Backend maneja la lógica de tipo de usuario
const validateLoginCredentials = (credentials: LoginCredentials): void => {
  const fields: Record<string, FieldValidation> = {
    email: {
      field: 'email',
      required: true,
      rules: [ValidationRules.email()],
      requiredMessage: 'El email es requerido'
    }
  };

  // Solo validar contraseña si se proporciona (admin)
  if (credentials.password) {
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
export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  try {
    logger.info('Iniciando proceso de login', { email: credentials.email }, 'AuthService');
    
    // Validar credenciales básicas
    logger.debug('Validando credenciales', { email: credentials.email, hasPassword: !!credentials.password }, 'AuthService');
    
    // Validación básica temporal
    if (!credentials.email) {
      throw new Error('Email es requerido');
    }
    if (!credentials.email.includes('@')) {
      throw new Error('Formato de email inválido');
    }
    
    logger.debug('Credenciales validadas correctamente', {}, 'AuthService');
    
    // TODO: Cuando el backend esté listo, usar:
    // const response = await apiMethods.post('/auth/login', credentials);
    // return response.data;
    
    // Por ahora mantenemos la simulación con manejo de errores
    await simulateNetworkDelay(1000, Math.random() < 0.01); // 1% de probabilidad de fallo para testing
    
    // Simular validación del backend
    const user = mockUsers.find(u => u.email === credentials.email);
    
    logger.debug('Usuario encontrado', { 
      email: credentials.email, 
      userFound: !!user, 
      userId: user?.id,
      userRole: user?.role,
      isAdmin: user?.isAdmin 
    }, 'AuthService');
    
    if (!user) {
      throw errorService.createBusinessError(
        'AUTH',
        'Usuario no encontrado',
        'El email ingresado no está registrado en el sistema'
      );
    }

    // Verificar que el usuario esté activo
    if (!user.isActive) {
      throw errorService.createBusinessError(
        'AUTH',
        'Usuario inactivo',
        'Tu cuenta ha sido desactivada. Contacta al administrador'
      );
    }

    // Lógica del backend: Si es admin, validar contraseña
    if (user.isAdmin) {
      if (!credentials.password) {
        throw errorService.createBusinessError(
          'AUTH',
          'Contraseña requerida',
          'Debes ingresar la contraseña para acceder como administrador'
        );
      }
      if (credentials.password !== user.password) {
        throw errorService.createBusinessError(
          'AUTH',
          'Credenciales incorrectas',
          'La contraseña ingresada no es correcta'
        );
      }
    }
    
    // Simular token JWT con estructura del backend
    const token = `mock-jwt-${user.id}-${Date.now()}`;
    
    // Actualizar último login
    const updatedUser = {
      ...user,
      updatedAt: new Date().toISOString()
    };
    
    logger.info('Login exitoso', { userId: user.id, email: user.email, isAdmin: user.isAdmin, role: user.role }, 'AuthService');
    
    const result = { user: updatedUser, token };
    logger.debug('Retornando resultado del login', { 
      hasUser: !!result.user, 
      hasToken: !!result.token,
      userId: result.user?.id,
      userRole: result.user?.role 
    }, 'AuthService');
    
    return result;
  } catch (error) {
    logger.error('Error en login', { 
      email: credentials.email, 
      error: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : typeof error
    }, 'AuthService');
    
    // Re-lanzar el error para que sea manejado por el LoginForm
    throw error;
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

    // Verificar que el usuario esté activo
    if (!user.isActive) {
      throw errorService.createBusinessError('AUTH', 'Usuario inactivo');
    }
    
    logger.debug('Token validado exitosamente', { userId: user.id, isAdmin: user.isAdmin, role: user.role }, 'AuthService');
    
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
