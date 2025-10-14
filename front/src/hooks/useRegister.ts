import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification, useErrorHandler } from './index';
import { logger, api } from '../services';
import type { ValidateTokenResponse } from '../types/api';

export interface RegisterFormData {
  name: string;
  email: string;
  role: 'user' | 'director';
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  isActive?: boolean;
  role: 'user' | 'director';
}

/**
 * Hook para manejar el registro de nuevos usuarios
 * 
 * Proporciona funcionalidad para crear usuarios desde el panel de administración.
 * Solo usuarios admin pueden registrar nuevos usuarios.
 * 
 * @returns {Object} Objeto con funciones y estados del registro
 */
export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotification();
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();

  /**
   * Registrar un nuevo usuario en el sistema
   * 
   * @param userData - Datos del usuario a registrar
   * @returns Promise que resuelve cuando el usuario se registra exitosamente
   * 
   * @throws {Error} Si ocurre un error durante el registro
   */
  const registerUser = async (userData: RegisterFormData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      logger.info('Iniciando registro de usuario', { email: userData.email }, 'useRegister');

      // Validaciones básicas
      if (!userData.name.trim()) {
        throw new Error('El nombre es requerido');
      }

      if (!userData.email.trim()) {
        throw new Error('El email es requerido');
      }

      if (!userData.email.includes('@')) {
        throw new Error('Formato de email inválido');
      }

      if (!userData.role) {
        throw new Error('El rol es requerido');
      }

      // Preparar datos para el backend
      const registerData: RegisterUserRequest = {
        name: userData.name.trim(),
        email: userData.email.trim().toLowerCase(),
        role: userData.role,
        isAdmin: false, // Solo admin puede crear usuarios, pero los usuarios creados no son admin
        isActive: true,
        // No se incluye password - solo admin tiene password
      };

      logger.debug('Datos de registro preparados', { 
        name: registerData.name,
        email: registerData.email,
        role: registerData.role 
      }, 'useRegister');

      // Llamada real al backend para crear usuario
      logger.debug('Enviando datos de registro al backend', { 
        name: registerData.name,
        email: registerData.email,
        role: registerData.role 
      }, 'useRegister');

      const response = await api.post<ValidateTokenResponse>('/users/', registerData);

      if (!response.data.success) {
        throw new Error(response.data.error || 'Error al crear usuario');
      }

      const newUser = response.data.data;
      
      logger.debug('Usuario registrado exitosamente', { 
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        id: newUser.id
      }, 'useRegister');

      logger.info('Usuario registrado exitosamente', { 
        email: userData.email,
        role: userData.role 
      }, 'useRegister');

      // Mostrar notificación de éxito
      addNotification({
        type: 'success',
        title: 'Usuario creado',
        message: `Usuario ${userData.name} registrado exitosamente`,
        duration: 5000
      });

      // Navegar a página de confirmación
      navigate('/confirmation', { 
        state: { 
          userName: userData.name,
          userEmail: userData.email,
          userRole: userData.role
        }
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al registrar usuario';
      
      logger.error('Error en registro de usuario', { 
        email: userData.email,
        error: errorMessage 
      }, 'useRegister');

      setError(errorMessage);
      
      addNotification({
        type: 'error',
        title: 'Error al crear usuario',
        message: errorMessage,
        duration: 0
      });

      handleError(err, 'useRegister');
      
      // Re-lanzar error para que el componente pueda manejarlo
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpiar mensajes de error
   */
  const clearError = (): void => {
    setError(null);
  };

  return {
    isLoading,
    error,
    registerUser,
    clearError
  };
};
