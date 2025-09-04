import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useFormValidation, useErrorHandler } from '../../hooks';
import { ErrorDisplay, ValidationErrors } from '../../components';
import { ValidationRules } from '../../services';

/** Componente de formulario de login con validación robusta */
export const LoginForm: React.FC = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();
  
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
      // Login exitoso - redirigir a WelcomePage
      navigate('/');
    } catch (err) {
      handleError(err, 'LoginForm');
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-xs flex flex-col items-center justify-center space-y-6"
      >
        {/* Campos del formulario */}
        <div className="space-y-4">
          {/* Campo Usuario/Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-white mb-1"
              style={{
                fontFamily: 'Istok Web',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              usuario/email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full px-3 py-2 rounded-lg border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] ${
                hasFieldErrors('email') && isFieldTouched('email') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
              }`}
              style={{
                fontFamily: 'Istok Web',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                backgroundColor: 'rgba(255, 110, 0, 0.7)'
              }}
              placeholder="Ingresa tu usuario o email"
              disabled={isLoading}
            />
            <ValidationErrors 
              errors={getFieldErrors('email')} 
            />
          </div>

          {/* Campo Contraseña */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-white mb-1"
              style={{
                fontFamily: 'Istok Web',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full px-3 py-2 rounded-lg border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] ${
                hasFieldErrors('password') && isFieldTouched('password') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
              }`}
              style={{
                fontFamily: 'Istok Web',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%',
                backgroundColor: 'rgba(255, 110, 0, 0.7)'
              }}
              placeholder="Ingresa tu contraseña"
              disabled={isLoading}
            />
            <ValidationErrors 
              errors={getFieldErrors('password')} 
            />
          </div>
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
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-40 h-10 rounded-[50px] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'Istok Web',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '0%',
              backgroundColor: '#FF6E00',
              boxShadow: '0px 4px 4px 0px #00000040'
            }}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </div>
      </form>
    </div>
  );
};