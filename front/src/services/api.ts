import axios from 'axios';

/**
 * Configuración base de Axios para la aplicación
 * 
 * Este archivo configura:
 * - Base URL para todas las requests
 * - Interceptores para JWT automático
 * - Manejo de errores de autenticación
 * - Headers consistentes
 */

// Crear instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor para requests - Agregar token JWT automáticamente
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para responses - Manejar errores de autenticación
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Si el error es 401 (no autorizado), limpiar token
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Redirigir a login si es necesario
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
