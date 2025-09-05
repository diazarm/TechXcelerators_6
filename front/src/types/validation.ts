/**
 * Sistema de Validación
 * 
 * Tipos y reglas para validación robusta de formularios con mensajes amigables,
 * validación en tiempo real y soporte para reglas personalizadas.
 */

export interface ValidationRule<T = unknown> {
  /** Nombre de la regla */
  name: string;
  /** Función de validación */
  validate: (value: T, context?: ValidationContext) => ValidationResult;
  /** Mensaje de error personalizado */
  message?: string;
  /** Si la regla es crítica (detiene la validación) */
  critical?: boolean;
}

// Tipo flexible para reglas de validación que pueden manejar diferentes tipos
export interface FlexibleValidationRule {
  /** Nombre de la regla */
  name: string;
  /** Función de validación flexible */
  validate: (value: unknown, context?: ValidationContext) => ValidationResult;
  /** Mensaje de error personalizado */
  message?: string;
  /** Si la regla es crítica (detiene la validación) */
  critical?: boolean;
}

export interface ValidationResult {
  /** Si la validación pasó */
  isValid: boolean;
  /** Mensaje de error si falló */
  message?: string;
  /** Código del error */
  code?: string;
}

export interface ValidationContext {
  /** Valor completo del objeto siendo validado */
  fullValue?: Record<string, unknown>;
  /** Campo padre (para validaciones anidadas) */
  parentField?: string;
  /** Configuración adicional */
  config?: Record<string, unknown>;
}

export interface FieldValidation {
  /** Nombre del campo */
  field: string;
  /** Reglas de validación */
  rules: FlexibleValidationRule[];
  /** Si el campo es requerido */
  required?: boolean;
  /** Mensaje de error personalizado para campo requerido */
  requiredMessage?: string;
}

export interface FormValidation {
  /** Validaciones por campo */
  fields: Record<string, FieldValidation>;
  /** Validaciones a nivel de formulario */
  formRules?: ValidationRule[];
}

export interface ValidationState {
  /** Errores de validación por campo */
  fieldErrors: Record<string, string[]>;
  /** Errores generales del formulario */
  formErrors: string[];
  /** Si el formulario es válido */
  isValid: boolean;
  /** Si se ha intentado validar */
  hasValidated: boolean;
  /** Campos que han sido tocados */
  touchedFields: Set<string>;
}

// Reglas de validación predefinidas
export const ValidationRules = {
  required: <T>(message = 'Este campo es obligatorio'): ValidationRule<T> => ({
    name: 'required',
    validate: (value: T) => ({
      isValid: value !== null && value !== undefined && value !== '',
      message
    }),
    critical: true
  }),

  email: (message = 'Por favor, ingresa un correo electrónico válido'): FlexibleValidationRule => ({
    name: 'email',
    validate: (value: unknown) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const stringValue = String(value);
      return {
        isValid: emailRegex.test(stringValue),
        message
      };
    }
  }),

  minLength: (min: number, message?: string): FlexibleValidationRule => ({
    name: 'minLength',
    validate: (value: unknown) => {
      const stringValue = String(value);
      return {
        isValid: stringValue.length >= min,
        message: message || `Debe tener al menos ${min} caracteres`
      };
    }
  }),

  maxLength: (max: number, message?: string): FlexibleValidationRule => ({
    name: 'maxLength',
    validate: (value: unknown) => {
      const stringValue = String(value);
      return {
        isValid: stringValue.length <= max,
        message: message || `No puede exceder ${max} caracteres`
      };
    }
  }),

  pattern: (regex: RegExp, message: string): FlexibleValidationRule => ({
    name: 'pattern',
    validate: (value: unknown) => {
      const stringValue = String(value);
      return {
        isValid: regex.test(stringValue),
        message
      };
    }
  }),

  min: (min: number, message?: string): FlexibleValidationRule => ({
    name: 'min',
    validate: (value: unknown) => {
      const numValue = Number(value);
      return {
        isValid: !isNaN(numValue) && numValue >= min,
        message: message || `El valor debe ser mayor o igual a ${min}`
      };
    }
  }),

  max: (max: number, message?: string): FlexibleValidationRule => ({
    name: 'max',
    validate: (value: unknown) => {
      const numValue = Number(value);
      return {
        isValid: !isNaN(numValue) && numValue <= max,
        message: message || `El valor debe ser menor o igual a ${max}`
      };
    }
  }),

  custom: <T>(
    validator: (value: T, context?: ValidationContext) => ValidationResult,
    message?: string
  ): ValidationRule<T> => ({
    name: 'custom',
    validate: validator,
    message
  })
};
