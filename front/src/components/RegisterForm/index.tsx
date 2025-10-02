import React from 'react';
import { useFormValidation, useRegister, useErrorHandler } from '../../hooks';
import { useScreenSize } from '../../context';
import { ValidationErrors, Button } from '../index';
import { ValidationRules } from '../../services';
import type { RegisterFormProps } from './types';

/**
 * RegisterForm - Formulario de registro de usuarios
 * 
 * Componente reutilizable para registrar nuevos usuarios en el sistema.
 * Incluye validación en tiempo real y manejo de errores.
 * Solo usuarios admin pueden registrar nuevos usuarios.
 * 
 * @example
 * ```tsx
 * <RegisterForm 
 *   onSuccess={(userData) => console.log('Usuario creado:', userData)}
 *   onError={(error) => console.error('Error:', error)}
 * />
 * ```
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onError,
  isLoading: externalLoading = false
}) => {
  const { registerUser, isLoading: registerLoading, clearError } = useRegister();
  const { handleError } = useErrorHandler();
  const { dimensions, scale } = useScreenSize();
  
  const isLoading = externalLoading || registerLoading;

  const {
    formData,
    updateField,
    validateForm,
    getFieldErrors,
    hasFieldErrors,
    isFieldTouched,
    touchField,
    resetForm
  } = useFormValidation(
    { name: '', email: '', role: 'user' as const },
    {
      validation: {
        fields: {
          name: {
            field: 'name',
            required: true,
            rules: [
              ValidationRules.minLength(2, 'El nombre debe tener al menos 2 caracteres'),
              ValidationRules.maxLength(50, 'El nombre no puede exceder 50 caracteres')
            ],
            requiredMessage: 'El nombre es requerido'
          },
          email: {
            field: 'email',
            required: true,
            rules: [
              ValidationRules.email('Formato de email inválido'),
              ValidationRules.maxLength(100, 'El email no puede exceder 100 caracteres')
            ],
            requiredMessage: 'El email es requerido'
          },
          role: {
            field: 'role',
            required: true,
            rules: [],
            requiredMessage: 'El rol es requerido'
          }
        }
      },
      validateOnChange: false,
      validateOnBlur: true
    }
  );

  /**
   * Manejar cambios en los campos del formulario
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    updateField(name as keyof typeof formData, value);
    
    // Limpiar errores del contexto si existen
    if (hasFieldErrors(name as keyof typeof formData)) {
      clearError();
    }
  };

  /**
   * Manejar blur de campos para activar validación
   */
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = e.target;
    touchField(name as keyof typeof formData);
  };

  /**
   * Manejar envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    const validationResult = validateForm();
    
    if (!validationResult.isValid) {
      return;
    }
    
    try {
      await registerUser(formData);
      
      // Llamar callback de éxito si existe
      if (onSuccess) {
        onSuccess(formData);
      }
      
      // Resetear formulario después del éxito
      resetForm();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      
      // Llamar callback de error si existe
      if (onError) {
        onError(errorMessage);
      }
      
      handleError(err, 'RegisterForm');
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ padding: dimensions.spacing.md }}
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center"
      >
        {/* Campos del formulario */}
        <div className="w-full">
          {/* Campo Nombre */}
          <div className="w-full" style={{ marginBottom: dimensions.spacing.md }}>
            <label 
              htmlFor="name" 
              className="block text-white istok-web"
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.md,
                lineHeight: '100%',
                letterSpacing: '0%',
                marginBottom: dimensions.spacing.xs
              }}
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] bg-[#D9D9D9] istok-web ${
                hasFieldErrors('name') && isFieldTouched('name') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
              }`}
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.md,
                lineHeight: '100%',
                letterSpacing: '0%',
                paddingLeft: dimensions.spacing.sm,
                paddingRight: dimensions.spacing.sm,
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm,
                borderRadius: `${scale(30)}px`
              }}
              placeholder="Ingresa el nombre completo"
              disabled={isLoading}
            />
            <ValidationErrors errors={getFieldErrors('name')} />
          </div>

          {/* Campo Email */}
          <div className="w-full" style={{ marginBottom: dimensions.spacing.md }}>
            <label 
              htmlFor="email" 
              className="block text-white istok-web"
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.md,
                lineHeight: '100%',
                letterSpacing: '0%',
                marginBottom: dimensions.spacing.xs
              }}
            >
              Correo
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full border-0 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] bg-[#D9D9D9] istok-web ${
                hasFieldErrors('email') && isFieldTouched('email') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
              }`}
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.md,
                lineHeight: '100%',
                letterSpacing: '0%',
                paddingLeft: dimensions.spacing.sm,
                paddingRight: dimensions.spacing.sm,
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm,
                borderRadius: `${scale(30)}px`
              }}
              placeholder="Ingresa el correo electrónico"
              disabled={isLoading}
            />
            <ValidationErrors errors={getFieldErrors('email')} />
          </div>

          {/* Campo Rol */}
          <div className="w-full" style={{ marginBottom: dimensions.spacing.md }}>
            <label 
              htmlFor="role" 
              className="block text-white istok-web"
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.md,
                lineHeight: '100%',
                letterSpacing: '0%',
                marginBottom: dimensions.spacing.xs
              }}
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full border-0 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6E00] bg-[#D9D9D9] istok-web appearance-none cursor-pointer ${
                hasFieldErrors('role') && isFieldTouched('role') ? 'ring-2 ring-red-400' : 'ring-2 ring-transparent'
              }`}
              style={{
                fontWeight: 400,
                fontSize: dimensions.fontSize.md,
                lineHeight: '100%',
                letterSpacing: '0%',
                paddingLeft: dimensions.spacing.sm,
                paddingRight: dimensions.spacing['2xl'],
                paddingTop: dimensions.spacing.sm,
                paddingBottom: dimensions.spacing.sm,
                borderRadius: `${scale(30)}px`,
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: `right ${dimensions.spacing.sm}px center`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px 12px'
              }}
              disabled={isLoading}
            >
              <option value="user">Usuario</option>
              <option value="director">Director</option>
            </select>
            <ValidationErrors errors={getFieldErrors('role')} />
          </div>
        </div>

        {/* Botón de envío */}
        <div className="w-full" style={{ marginTop: dimensions.spacing.lg }}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            onClick={() => {}}
            className="w-full font-medium"
            style={{ opacity: 0.7 }}
          >
            {isLoading ? 'Creando...' : 'Crear'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
