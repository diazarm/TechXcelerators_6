import { useState, useEffect } from 'react';
import type { User } from '../types/globalTypes';

/**
 * Hook personalizado para manejar la autenticación del usuario
 * 
 * @example
 * ```tsx
 * const { user, loading, login, logout, isAuthenticated } = useAuth();
 * 
 * if (loading) return <div>Cargando...</div>;
 * 
 * if (isAuthenticated) {
 *   return <div>Bienvenido, {user?.name}</div>;
 * }
 * 
 * return <LoginForm onLogin={login} />;
 * ```
 * 
 * @returns {Object} Objeto con el estado y métodos de autenticación
 * @returns {User | null} returns.user - Usuario autenticado o null
 * @returns {boolean} returns.loading - Estado de carga
 * @returns {Function} returns.login - Función para iniciar sesión
 * @returns {Function} returns.logout - Función para cerrar sesión
 * @returns {boolean} returns.isAuthenticated - Si el usuario está autenticado
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lógica de verificación de autenticación al montar el componente
    const checkAuth = async () => {
      try {
        // TODO: Implementar verificación de token/sesión
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //   const userData = await AuthService.validateToken(token);
        //   setUser(userData);
        // }
        setLoading(false);
      } catch {
        // Si hay error, asumimos que no hay sesión válida
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Función para iniciar sesión
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   */
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // TODO: Implementar llamada al servicio de autenticación
      console.log('Intentando login con:', email, 'y password:', password ? '***' : 'no proporcionado'); // Usar ambos parámetros
      // const response = await AuthService.login(email, password);
      // setUser(response.data);
      // localStorage.setItem('authToken', response.token);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    setUser(null);
    // TODO: Limpiar token del localStorage
    // localStorage.removeItem('authToken');
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
};
