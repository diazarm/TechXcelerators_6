import React from 'react';
import { useAuth, useResponsive, useFormValidation, useErrorHandler } from '../../hooks';
import { Button, ErrorDisplay, ValidationErrors } from '../../components';
import { ValidationRules } from '../../services';

/** Componente de formulario de login con validación robusta */
export const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const { containerSmall, text, shadow } = useResponsive();
  const { handleError } = useErrorHandler();
  
  const {
    formData,
    updateField,
    validateForm,
    getFieldErrors,
    hasFieldErrors,
    isFieldTouched,
    touchField
  } = useFormValidation(
    { email: '', password: '' },
    {
      validation: {
        fields: {
          email: {
            field: 'email',
            required: true,
            rules: [ValidationRules.email()],
            requiredMessage: 'Necesitamos tu correo electrónico para iniciar sesión'
          },
          password: {
            field: 'password',
            required: true,
            rules: [ValidationRules.minLength(6, 'Tu contraseña debe tener al menos 6 caracteres para mayor seguridad')],
            requiredMessage: 'Ingresa tu contraseña para continuar'
          }
        }
      },
      validateOnChange: true,
      validateOnBlur: true
    }
  );

  /** Manejar cambios en los campos */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
    
    // Limpiar error del contexto si existe
    if (error) {
      clearError();
    }
  };

  /** Manejar blur de campos */
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    touchField(name as keyof typeof formData);
  };

  /** Manejar envío del formulario */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const validationResult = validateForm();
    
    if (!validationResult.isValid) {
      return;
    }
    
    try {
      await login(formData);
      // Login exitoso - el contexto maneja el estado
    } catch (err) {
      handleError(err, 'LoginForm');
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
            onBlur={handleInputBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasFieldErrors('email') && isFieldTouched('email') ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="tu@email.com"
            disabled={isLoading}
          />
          <ValidationErrors 
            errors={getFieldErrors('email')} 
          />
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
            onBlur={handleInputBlur}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasFieldErrors('password') && isFieldTouched('password') ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="••••••••"
            disabled={isLoading}
          />
          <ValidationErrors 
            errors={getFieldErrors('password')} 
          />
        </div>

        {/* Error del contexto */}
        {error && (
          <ErrorDisplay 
            error={{ 
              code: 'AUTH_ERROR', 
              message: error, 
              timestamp: new Date() 
            }}
            title="Error de autenticación"
            onDismiss={clearError}
          />
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
