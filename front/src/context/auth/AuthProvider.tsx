import React, { useState, useEffect, useCallback } from 'react';
import type { AuthContextType, User, LoginCredentials, AuthProviderProps } from '../../types';
import { AuthContext } from './../index';
import { login, logout } from '../../services';

/** Proveedor del contexto de autenticación */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estados de autenticación
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Iniciar en true para verificar auth
  const [error, setError] = useState<string | null>(null);

  // Estado calculado
  const isAuthenticated = !!user;

  /** Cerrar sesión del usuario */
  const logoutUser = useCallback((): void => {
    setUser(null);
    setError(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Guardar timestamp del logout para evitar notificaciones innecesarias
    localStorage.setItem('lastLogout', Date.now().toString());
    logout();
  }, []);

  /** Verificar si hay una sesión válida guardada */
  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');
      
      if (!token || !savedUser) {
        setIsLoading(false);
        return;
      }

      // Restaurar usuario desde localStorage inmediatamente
      const user = JSON.parse(savedUser);
      setUser(user);

      // TODO: Implementar validación de token con backend
      // const user = await validateToken(token);
      // setUser(user);
    } catch (err) {
      console.error('Error verificando autenticación:', err);
      logoutUser();
    } finally {
      setIsLoading(false);
    }
  }, [logoutUser]);

  /** Verificar autenticación al cargar la app */
  useEffect(() => {
    // Pequeño delay para asegurar que el estado se restaure correctamente
    const timer = setTimeout(() => {
      checkAuth();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [checkAuth]);

  /** Iniciar sesión del usuario */
  const loginUser = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Validaciones básicas
      if (!credentials.email) {
        throw new Error('Email es requerido');
      }

      if (!credentials.email.includes('@')) {
        throw new Error('Formato de email inválido');
      }

      // El backend maneja la lógica de validación de contraseña
      // Si se proporciona password, se valida; si no, se asume staff
      if (credentials.password && credentials.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Llamada al servicio de autenticación
      const { user, token } = await login(credentials);

      // Guardar en estado y localStorage
      setUser(user);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      // Limpiar timestamp de logout al hacer login
      localStorage.removeItem('lastLogout');
      
      // Retornar el resultado para que el LoginForm pueda usarlo
      return { user, token };

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
