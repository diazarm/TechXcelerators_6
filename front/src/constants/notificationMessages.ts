/**
 * Mensajes de notificación personalizados para diferentes tipos de usuario
 */

export const NOTIFICATION_MESSAGES = {
  // Mensajes de bienvenida por tipo de usuario
  WELCOME: {
    ADMIN: '¡Bienvenido, administrador! Acceso completo al sistema.',
    DIRECTOR: '¡Bienvenido, director! Permisos de gestión activados.',
    USER: '¡Bienvenido a Scala Learning! Sesión iniciada correctamente.',
    DEFAULT: '¡Bienvenido a Scala Learning! Sesión iniciada correctamente.'
  },

  // Mensajes de error específicos
  ERROR: {
    INVALID_CREDENTIALS_ADMIN: 'Las credenciales de administrador no son válidas. Verifica tu email y contraseña.',
    INVALID_CREDENTIALS_STAFF: 'El email ingresado no está registrado en el sistema.',
    PASSWORD_REQUIRED: 'Debes ingresar la contraseña para acceder como administrador.',
    USER_INACTIVE: 'Tu cuenta ha sido desactivada. Contacta al administrador para más información.',
    ACCESS_DENIED: 'Este usuario no tiene permisos para acceder como {type}.',
    EMAIL_REQUIRED: 'Por favor, ingresa tu correo electrónico para continuar.',
    PASSWORD_REQUIRED_FIELD: 'Por favor, ingresa tu contraseña para continuar.',
    INVALID_EMAIL_FORMAT: 'Por favor, verifica que el formato de tu email sea correcto.'
  },

  // Títulos de notificaciones
  TITLES: {
    SUCCESS: '¡Acceso exitoso!',
    ERROR: 'Error de acceso',
    FIELD_REQUIRED: 'Campo requerido',
    INVALID_EMAIL: 'Email inválido',
    ACCESS_DENIED: 'Acceso denegado',
    PASSWORD_REQUIRED: 'Contraseña requerida',
    ACCOUNT_INACTIVE: 'Cuenta inactiva'
  }
} as const;

/**
 * Obtener mensaje de bienvenida personalizado según el tipo de usuario
 */
export const getWelcomeMessage = (userType: string): string => {
  switch (userType) {
    case 'Administrador':
      return NOTIFICATION_MESSAGES.WELCOME.ADMIN;
    case 'Director':
      return NOTIFICATION_MESSAGES.WELCOME.DIRECTOR;
    case 'Usuario':
      return NOTIFICATION_MESSAGES.WELCOME.USER;
    default:
      return NOTIFICATION_MESSAGES.WELCOME.DEFAULT;
  }
};

/**
 * Obtener mensaje de error personalizado
 */
export const getErrorMessage = (errorType: string, accessType?: 'staff' | 'admin'): { title: string; message: string } => {
  switch (errorType) {
    case 'Email es requerido':
      return {
        title: NOTIFICATION_MESSAGES.TITLES.FIELD_REQUIRED,
        message: NOTIFICATION_MESSAGES.ERROR.EMAIL_REQUIRED
      };
    case 'Contraseña es requerida':
      return {
        title: NOTIFICATION_MESSAGES.TITLES.FIELD_REQUIRED,
        message: NOTIFICATION_MESSAGES.ERROR.PASSWORD_REQUIRED_FIELD
      };
    case 'Formato de email inválido':
      return {
        title: NOTIFICATION_MESSAGES.TITLES.INVALID_EMAIL,
        message: NOTIFICATION_MESSAGES.ERROR.INVALID_EMAIL_FORMAT
      };
    case 'Credenciales inválidas':
      return {
        title: NOTIFICATION_MESSAGES.TITLES.ACCESS_DENIED,
        message: accessType === 'admin' 
          ? NOTIFICATION_MESSAGES.ERROR.INVALID_CREDENTIALS_ADMIN
          : NOTIFICATION_MESSAGES.ERROR.INVALID_CREDENTIALS_STAFF
      };
    case 'API_404':
      return {
        title: 'Servicio no disponible',
        message: 'El servidor no está respondiendo. Verifica que el backend esté corriendo en el puerto 3000.'
      };
    case 'NETWORK_ERROR':
      return {
        title: 'Sin conexión',
        message: 'No se pudo conectar con el servidor. Verifica tu conexión.'
      };
    case 'Acceso denegado: Este endpoint es solo para administradores':
      return {
        title: 'Acceso restringido',
        message: 'Este login es exclusivo para administradores. Usa el login de usuario para acceder con tu rol.'
      };
    case 'Contraseña requerida':
      return {
        title: NOTIFICATION_MESSAGES.TITLES.PASSWORD_REQUIRED,
        message: NOTIFICATION_MESSAGES.ERROR.PASSWORD_REQUIRED
      };
    case 'Usuario inactivo':
      return {
        title: NOTIFICATION_MESSAGES.TITLES.ACCOUNT_INACTIVE,
        message: NOTIFICATION_MESSAGES.ERROR.USER_INACTIVE
      };
    case 'Acceso denegado':
      return {
        title: NOTIFICATION_MESSAGES.TITLES.ACCESS_DENIED,
        message: NOTIFICATION_MESSAGES.ERROR.ACCESS_DENIED.replace('{type}', accessType === 'admin' ? 'administrador' : 'staff')
      };
    default:
      return {
        title: NOTIFICATION_MESSAGES.TITLES.ERROR,
        message: errorType
      };
  }
};
