import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useFormValidation, useErrorHandler, useNotification } from '../../hooks';
import { ValidationErrors } from '../../components';
import { ValidationRules } from '../../services';
import { getUserTypeDisplay } from '../../utils';
import { getWelcomeMessage, getErrorMessage, NOTIFICATION_MESSAGES } from '../../constants';
import type { LoginCredentials } from '../../types';

interface LoginFormProps {
  accessType: 'staff' | 'admin';
}


/** Componente de formulario de login con validación optimizada */
export const LoginForm: React.FC<LoginFormProps> = ({ accessType }) => {
  const { login, isLoading, error, clearError } = useAuth();
  const { handleError } = useErrorHandler();
  const { addNotification } = useNotification();
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
    accessType === 'admin' ? { email: '', password: '' } : { email: '' },
    {
      validation: {
        fields: {
          email: {
            field: 'email',
            required: true,
            rules: [ValidationRules.email()],
            requiredMessage: 'Necesitamos tu correo electrónico para iniciar sesión'
          },
          ...(accessType === 'admin' && {
            password: {
              field: 'password',
              required: true,
              rules: [ValidationRules.minLength(6, 'Tu contraseña debe tener al menos 6 caracteres para mayor seguridad')],
              requiredMessage: 'Ingresa tu contraseña para continuar'
            }
          })
        }
      },
      validateOnChange: false, // DESACTIVAR validación en tiempo real
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
                  // Preparar credenciales según el tipo de acceso
                  const credentials: LoginCredentials = accessType === 'admin' 
                    ? { 
                        email: formData.email, 
                        password: formData.password || '' // Para admin, password es requerido
                      }
                    : { 
                        email: formData.email 
                        // Para usuario, no se incluye password
                      };
                  
                  const { user, token } = await login(credentials);
                  
                  // Obtener tipo de usuario para mensaje personalizado
                  const userType = getUserTypeDisplay(user);
                  
                  // Login exitoso - mostrar notificación personalizada y redirigir
                  addNotification({
                    type: 'success',
                    title: NOTIFICATION_MESSAGES.TITLES.SUCCESS,
                    message: getWelcomeMessage(userType),
                    duration: 4000
                  });
                  navigate('/dashboard');
                } catch (err) {
                  // Mostrar error como notificación
                  const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                  
                  // Obtener mensaje de error personalizado
                  const { title, message } = getErrorMessage(errorMessage, accessType);
                  
                  addNotification({
                    type: 'error',
                    title,
                    message,
                    duration: 0 // No auto-hide para errores críticos
                  });
                  handleError(err, 'LoginForm');
                }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8">
      <form 
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center space-y-8"
      >
        {/* Campos del formulario */}
        <div className="w-full space-y-6">
          {/* Campo Usuario/Email */}
          <div className="w-full">
            <label 
              htmlFor="email" 
              className="block text-white mb-1 istok-web"
              style={{
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full px-4 py-3 rounded-[30px] border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] bg-[#D9D9D9] istok-web ${
                hasFieldErrors('email') && isFieldTouched('email') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
              }`}
              style={{
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '100%',
                letterSpacing: '0%'
              }}
              placeholder="Ingresa tu usuario o email"
              disabled={isLoading}
            />
            <ValidationErrors 
              errors={getFieldErrors('email')} 
            />
          </div>

          {/* Campo Contraseña - Solo para Admin */}
          {accessType === 'admin' && (
            <div className="w-full">
              <label 
                htmlFor="password" 
                className="block text-white mb-1 istok-web"
                style={{
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
                className={`w-full px-4 py-3 rounded-[30px] border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] bg-[#D9D9D9] istok-web ${
                  hasFieldErrors('password') && isFieldTouched('password') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
                }`}
                style={{
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '100%',
                  letterSpacing: '0%'
                }}
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
              />
              <ValidationErrors 
                errors={getFieldErrors('password')} 
              />
            </div>
          )}
        </div>


        {/* Botón de envío */}
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-40 h-10 rounded-[50px] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed istok-web"
            style={{
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