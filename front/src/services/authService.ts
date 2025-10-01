import type { User, LoginCredentials } from '../types';
import { api } from './api';
import { errorService, logger } from './index';

/** Servicio de autenticación con backend real */

/** Iniciar sesión del usuario */
export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  try {
    logger.info('Iniciando proceso de login', { email: credentials.email }, 'AuthService');
    
    // Validación básica
    if (!credentials.email) {
      throw new Error('Email es requerido');
    }
    if (!credentials.email.includes('@')) {
      throw new Error('Formato de email inválido');
    }
    
    logger.debug('Enviando credenciales al backend', { email: credentials.email, hasPassword: !!credentials.password }, 'AuthService');
    
    // Llamada real al backend
    const response = await api.post('/users/login', credentials);
    
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Error en el login');
    }
    
    const { user, token } = response.data.data;
    
    logger.info('Login exitoso', { 
      userId: user.id, 
      email: user.email, 
      isAdmin: user.isAdmin, 
      role: user.role 
    }, 'AuthService');
    
    return { user, token };
  } catch (error) {
    logger.error('Error en login', { 
      email: credentials.email, 
      error: error instanceof Error ? error.message : (error as any)?.message || 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : typeof error
    }, 'AuthService');
    
    // Re-lanzar el error para que sea manejado por el LoginForm
    throw error;
  }
};

/** Verificar si un token es válido */
export const validateToken = async (token: string): Promise<User> => {
  try {
    logger.debug('Validando token con backend', { tokenLength: token.length }, 'AuthService');
    
    if (!token) {
      throw new Error('Token no proporcionado');
    }
    
    // Llamada real al backend para validar token
    const response = await api.get('/users/verifytoken');
    
    if (!response.data || !response.data.user) {
      throw new Error('Token inválido o expirado');
    }
    
    const user = response.data.user;
    
    logger.debug('Token validado exitosamente', { 
      userId: user.uid, 
      isAdmin: user.isAdmin, 
      role: user.role 
    }, 'AuthService');
    
    // Convertir formato del backend al formato del frontend
    const frontendUser: User = {
      id: user.uid,
      name: user.name,
      email: user.email,
      isActive: true, // El backend no incluye isActive en el payload del token
      role: user.role,
      isAdmin: user.isAdmin,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return frontendUser;
  } catch (error) {
    logger.error('Error validando token', { 
      tokenLength: token.length,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'AuthService');
    
    throw error;
  }
};

/** Cerrar sesión del usuario */
export const logout = async (): Promise<void> => {
  try {
    logger.info('Iniciando proceso de logout', {}, 'AuthService');
    
    // El backend no tiene endpoint específico de logout
    // La limpieza se hace en el frontend (localStorage)
    // El token expirará automáticamente según JWT_EXPIRATION
    
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
    logger.debug('Obteniendo usuario actual desde localStorage', {}, 'AuthService');
    
    // En el frontend, el usuario actual se obtiene del localStorage
    // No necesitamos llamar al backend para esto
    const savedUser = localStorage.getItem('user');
    
    if (!savedUser) {
      logger.debug('No hay usuario logueado', {}, 'AuthService');
      return null;
    }
    
    const user = JSON.parse(savedUser);
    logger.debug('Usuario actual obtenido', { userId: user.id }, 'AuthService');
    
    return user;
  } catch (error) {
    logger.error('Error obteniendo usuario actual', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'AuthService');
    
    // Retornar null en caso de error para no bloquear la aplicación
    return null;
  }
};
