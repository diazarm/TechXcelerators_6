/**
 * Props del componente ConfirmationPage
 */
export interface ConfirmationPageProps {
  /**
   * Nombre del usuario registrado
   */
  userName?: string;
  
  /**
   * Email del usuario registrado
   */
  userEmail?: string;
  
  /**
   * Rol del usuario registrado
   */
  userRole?: 'user' | 'director';
  
  /**
   * Texto personalizado para el mensaje de confirmación
   * @default "¡Nuevo usuario agregado con éxito!"
   */
  message?: string;
  
  /**
   * Texto personalizado para el botón de redirección
   * @default "Ir al dashboard"
   */
  buttonText?: string;
  
  /**
   * URL de destino del botón
   * @default "/dashboard"
   */
  redirectTo?: string;
}
