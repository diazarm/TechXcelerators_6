import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useFormValidation, useNotification } from '../../hooks';
import { useScreenSize } from '../../context';
import { ValidationErrors, Button } from '../../components';
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
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const { dimensions, scale } = useScreenSize();
  
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
                  
                  // Validar que el usuario sea admin si se está usando el login de admin
                  if (accessType === 'admin' && !user.isAdmin) {
                    throw new Error('Acceso denegado: Este endpoint es solo para administradores');
                  }
                  
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
                  
                  // Forzar actualización de hooks de responsividad
                  setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                  }, 100);
                } catch (err) {
                  // Mostrar error como notificación
                  let errorMessage = err instanceof Error 
                    ? err.message 
                    : (err as any)?.message || 'Error desconocido';
                  
                  // Detectar errores específicos del sistema
                  if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
                    errorMessage = 'API_404';
                  } else if (errorMessage.includes('Network Error') || errorMessage.includes('ECONNREFUSED')) {
                    errorMessage = 'NETWORK_ERROR';
                  }
                  
                  // Obtener mensaje de error personalizado
                  const { title, message } = getErrorMessage(errorMessage, accessType);
                  
                  addNotification({
                    type: 'error',
                    title,
                    message,
                    duration: 0 // No auto-hide para errores críticos
                  });
                  
                  // No llamar handleError aquí para evitar notificaciones duplicadas
                  // El error ya se muestra arriba con el mensaje personalizado en español
                }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ padding: dimensions.spacing.lg }}
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center"
      >
        {/* Campos del formulario */}
        <div className="w-full">
          {/* Campo Usuario/Email */}
          <div className="w-full" style={{ marginBottom: dimensions.spacing.md }}>
            <label 
              htmlFor="email" 
              className="block text-white istok-web"
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.lg,
                lineHeight: '100%',
                letterSpacing: '0%',
                marginBottom: dimensions.spacing.xs
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
              className={`w-full rounded-[30px] border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] bg-[#D9D9D9] istok-web ${
                hasFieldErrors('email') && isFieldTouched('email') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
              }`}
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.lg,
                lineHeight: '100%',
                letterSpacing: '0%',
                paddingLeft: dimensions.spacing.md,
                paddingRight: dimensions.spacing.md,
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm
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
            <div className="w-full" style={{ marginBottom: dimensions.spacing.md }}>
              <label 
                htmlFor="password" 
                className="block text-white istok-web"
                style={{
                  fontWeight: 400,
                  fontSize: dimensions.fontSize.lg,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  marginBottom: dimensions.spacing.xs
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
                className={`w-full rounded-[30px] border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] bg-[#D9D9D9] istok-web ${
                  hasFieldErrors('password') && isFieldTouched('password') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
                }`}
                style={{
                  fontWeight: 400,
                  fontSize: dimensions.fontSize.lg,
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  paddingLeft: dimensions.spacing.md,
                  paddingRight: dimensions.spacing.md,
                  paddingTop: dimensions.spacing.sm,
                  paddingBottom: dimensions.spacing.sm
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
        <div className="w-full" style={{ marginTop: dimensions.spacing.lg }}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            onClick={() => {}}
            className="w-full"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </div>
      </form>
    </div>
  );
};