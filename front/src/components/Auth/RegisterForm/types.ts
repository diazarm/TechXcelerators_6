import type { RegisterFormData } from '../../../hooks/useRegister';

/**
 * Props del componente RegisterForm
 */
export interface RegisterFormProps {
  /**
   * Función callback que se ejecuta cuando el formulario se envía exitosamente
   * @param userData - Datos del usuario registrado
   */
  onSuccess?: (userData: RegisterFormData) => void;
  
  /**
   * Función callback que se ejecuta cuando ocurre un error
   * @param error - Mensaje de error
   */
  onError?: (error: string) => void;
  
  /**
   * Texto personalizado para el botón de envío
   * @default "Registrar Usuario"
   */
  submitButtonText?: string;
  
  /**
   * Si el formulario debe mostrar estado de carga
   * @default false
   */
  isLoading?: boolean;
}
