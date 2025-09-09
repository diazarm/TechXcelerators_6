/**
 * ValidationService
 * 
 * Servicio centralizado para validación de formularios con reglas predefinidas,
 * validación en tiempo real y mensajes de error contextuales.
 */

import type {
  ValidationResult,
  ValidationContext,
  FieldValidation,
  FormValidation,
  ValidationState,
} from '../types/validation';
import { ValidationRules } from '../types/validation';
import { logger } from './index';

class ValidationService {
  /**
   * Validar un campo individual
   */
  validateField(
    fieldName: string,
    value: unknown,
    fieldValidation: FieldValidation,
    context?: ValidationContext
  ): ValidationResult[] {
    const errors: ValidationResult[] = [];

    // Validar si es requerido
    if (fieldValidation.required && this.isEmpty(value)) {
      errors.push({
        isValid: false,
        message: fieldValidation.requiredMessage || 'Este campo es requerido',
        code: 'REQUIRED'
      });
      logger.logValidation(fieldName, value, 'required', false);
      return errors; // Si es requerido y está vacío, no validar más
    }

    // Si no es requerido y está vacío, no validar
    if (!fieldValidation.required && this.isEmpty(value)) {
      logger.logValidation(fieldName, value, 'required', true);
      return errors;
    }

    // Validar reglas
    for (const rule of fieldValidation.rules) {
      try {
        const result = rule.validate(value, context);
        logger.logValidation(fieldName, value, rule.name, result.isValid);
        
        if (!result.isValid) {
          errors.push({
            isValid: false,
            message: result.message || rule.message || `Error en ${rule.name}`,
            code: rule.name.toUpperCase()
          });

          // Si es crítica, detener validación
          if (rule.critical) {
            break;
          }
        }
      } catch (error) {
        logger.error(`Error validating field ${fieldName} with rule ${rule.name}`, {
          field: fieldName,
          rule: rule.name,
          value,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        
        errors.push({
          isValid: false,
          message: 'Error de validación interno',
          code: 'VALIDATION_ERROR'
        });
      }
    }

    return errors;
  }

  /**
   * Validar un formulario completo
   */
  validateForm(
    formData: Record<string, unknown>,
    formValidation: FormValidation
  ): ValidationState {
    const fieldErrors: Record<string, string[]> = {};
    const formErrors: string[] = [];
    let isValid = true;

    // Validar campos individuales
    for (const [fieldName, fieldValidation] of Object.entries(formValidation.fields)) {
      const value = formData[fieldName];
      const context: ValidationContext = {
        fullValue: formData,
        parentField: fieldName
      };

      const errors = this.validateField(fieldName, value, fieldValidation, context);
      
      if (errors.length > 0) {
        fieldErrors[fieldName] = errors.map(e => e.message || 'Error de validación');
        isValid = false;
      }
    }

    // Validar reglas de formulario
    if (formValidation.formRules) {
      for (const rule of formValidation.formRules) {
        try {
          const result = rule.validate(formData);
          if (!result.isValid) {
            formErrors.push(result.message || 'Error de validación del formulario');
            isValid = false;
          }
        } catch (error) {
          logger.error('Error validating form rule', {
            rule: rule.name,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          formErrors.push('Error de validación interno');
          isValid = false;
        }
      }
    }

    return {
      fieldErrors,
      formErrors,
      isValid,
      hasValidated: true,
      touchedFields: new Set(Object.keys(formData))
    };
  }

  /**
   * Validar un campo en tiempo real
   */
  validateFieldRealTime(
    fieldName: string,
    value: unknown,
    fieldValidation: FieldValidation,
    context?: ValidationContext
  ): string[] {
    const errors = this.validateField(fieldName, value, fieldValidation, context);
    return errors.map(e => e.message || 'Error de validación');
  }

  /**
   * Verificar si un valor está vacío
   */
  private isEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /**
   * Crear reglas de validación comunes
   */
  static createCommonRules() {
    return {
      email: ValidationRules.email(),
      required: ValidationRules.required(),
      minLength: (min: number) => ValidationRules.minLength(min),
      maxLength: (max: number) => ValidationRules.maxLength(max),
      password: () => ValidationRules.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial'
      ),
      phone: () => ValidationRules.pattern(
        /^[+]?[1-9][\d]{0,15}$/,
        'Ingresa un número de teléfono válido'
      ),
      url: () => ValidationRules.pattern(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
        'Ingresa una URL válida'
      )
    };
  }
}

// Instancia singleton
export const validationService = new ValidationService();

export default validationService;
