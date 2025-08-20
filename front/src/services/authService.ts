import type { User, ApiResponse } from '../types/globalTypes';
import { API_ENDPOINTS } from '../constants/appConstants';

/**
 * Servicio de autenticación
 * Maneja todas las operaciones relacionadas con la autenticación de usuarios
 * 
 * @example
 * ```tsx
 * // Login
 * try {
 *   const response = await AuthService.login('user@example.com', 'password123');
 *   if (response.success) {
 *     console.log('Usuario logueado:', response.data);
 *   }
 * } catch (error) {
 *   console.error('Error en login:', error);
 * }
 * 
 * // Registro
 * const newUser = await AuthService.register({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   role: 'user'
 * });
 * ```
 */
export class AuthService {
  private static baseUrl = API_ENDPOINTS.BASE_URL;

  /**
   * Inicia sesión de un usuario
   * 
   * @param email - Email del usuario
   * @param password - Contraseña del usuario
   * @returns Promise con la respuesta de la API
   * @throws {Error} Si la respuesta no es exitosa
   */
  static async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en AuthService.login:', error);
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }
  }

  /**
   * Registra un nuevo usuario
   * 
   * @param userData - Datos del usuario a registrar
   * @returns Promise con la respuesta de la API
   * @throws {Error} Si la respuesta no es exitosa
   */
  static async register(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en AuthService.register:', error);
      throw new Error('Error al registrar usuario. Verifica los datos ingresados.');
    }
  }

  /**
   * Cierra la sesión del usuario
   * 
   * @returns Promise que se resuelve cuando se cierra la sesión
   */
  static async logout(): Promise<void> {
    try {
      // TODO: Implementar llamada al backend para invalidar token
      // await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH}/logout`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${getToken()}`,
      //   },
      // });
      
      // Limpiar token del localStorage
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error en AuthService.logout:', error);
      // Aún limpiamos el token local aunque falle la llamada al backend
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Valida si un token es válido
   * 
   * @param token - Token a validar
   * @returns Promise con la información del usuario si el token es válido
   * @throws {Error} Si el token no es válido
   */
  static async validateToken(token: string): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}${API_ENDPOINTS.AUTH}/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error en AuthService.validateToken:', error);
      throw new Error('Token inválido o expirado');
    }
  }
}
