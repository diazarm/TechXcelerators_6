import React, { useState, useEffect, useCallback } from 'react';
import type { AuthContextType, User, LoginCredentials, AuthProviderProps } from '../../types';
import { AuthContext } from './../index';
import { login, validateToken, logout } from '../../services';

/** Proveedor del contexto de autenticación */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estados de autenticación
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado calculado
  const isAuthenticated = !!user;

  /** Cerrar sesión del usuario */
  const logoutUser = useCallback((): void => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    logout();
  }, []);

  /** Verificar si hay una sesión válida guardada */
  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      // TODO: Implementar validación de token con backend
      const user = await validateToken(token);
      setUser(user);
    } catch (err) {
      console.error('Error verificando autenticación:', err);
      logoutUser();
    }
  }, [logoutUser]);

  /** Verificar autenticación al cargar la app */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /** Iniciar sesión del usuario */
  const loginUser = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Validaciones básicas
      if (!credentials.email || !credentials.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      if (!credentials.email.includes('@')) {
        throw new Error('Formato de email inválido');
      }

      // TODO: Implementar llamada al backend
      const { user, token } = await login(credentials);

      // Guardar en estado y localStorage
      setUser(user);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error en el login';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /** Limpiar mensajes de error */
  const clearError = (): void => {
    setError(null);
  };

  // Valor del contexto
  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    isAuthenticated,
    login: loginUser,
    logout: logoutUser,
    checkAuth,
    clearError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
