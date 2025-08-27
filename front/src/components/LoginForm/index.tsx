import React, { useState } from 'react';
import { useAuth, useResponsive } from '../../hooks';
import { Button } from '../../components';

/** Componente de formulario de login */
export const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const { containerSmall, text, shadow } = useResponsive();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  /** Validar campos del formulario */
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Formato de email inválido';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /** Manejar cambios en los campos */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error de validación del campo
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Limpiar error del contexto si existe
    if (error) {
      clearError();
    }
  };

  /** Manejar envío del formulario */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(formData);
      // Login exitoso - el contexto maneja el estado
    } catch (err) {
      // El error ya se maneja en el contexto
      console.error('Error en login:', err);
    }
  };

  return (
    <div className={containerSmall}>
      <form 
        onSubmit={handleSubmit}
        className={`bg-white ${shadow.medium} rounded-lg p-6 sm:p-8 space-y-6`}
      >
        {/* Título */}
        <div className="text-center">
          <h2 className={`${text.h2} text-gray-900 mb-2`}>
            Iniciar Sesión
          </h2>
        </div>

        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="tu@email.com"
            disabled={isLoading}
          />
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
          )}
        </div>

        {/* Campo Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              validationErrors.password ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
          )}
        </div>

        {/* Error del contexto */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Botón de envío */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>


      </form>
    </div>
  );
};
