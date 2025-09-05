/**
 * useFormValidation Hook
 * 
 * Hook para manejo completo de formularios con validación en tiempo real,
 * estado de campos y mensajes de error contextuales.
 */

import { useState, useCallback, useRef } from 'react';
import { validationService, logger } from '../services';
import type { 
  ValidationState
} from '../types/validation';
import type { UseFormValidationOptions, UseFormValidationReturn } from './types';



export function useFormValidation<T extends Record<string, unknown>>(
  initialData: T,
  options: UseFormValidationOptions
): UseFormValidationReturn<T> {
  const {
    validation,
    validateOnChange = true,
    validateOnBlur = true,
    onValidationChange
  } = options;

  const [formData, setFormData] = useState<T>(initialData);
  const [validationState, setValidationState] = useState<ValidationState>({
    fieldErrors: {},
    formErrors: [],
    isValid: true,
    hasValidated: false,
    touchedFields: new Set()
  });

  const validationTimeoutRef = useRef<number | undefined>(undefined);

  /**
   * Validar un campo específico
   */
  const validateField = useCallback((field: keyof T) => {
    const fieldValidation = validation.fields[field as string];
    if (!fieldValidation) return;

    const value = formData[field];
    const context = {
      fullValue: formData,
      parentField: field as string
    };

    const errors = validationService.validateField(
      field as string,
      value,
      fieldValidation,
      context
    );

    const errorMessages = errors.map(e => e.message || 'Error de validación');

    setValidationState(prev => {
      const newFieldErrors = { ...prev.fieldErrors };
      
      if (errorMessages.length > 0) {
        newFieldErrors[field as string] = errorMessages;
      } else {
        delete newFieldErrors[field as string];
      }

      const newState = {
        ...prev,
        fieldErrors: newFieldErrors,
        isValid: Object.keys(newFieldErrors).length === 0 && prev.formErrors.length === 0
      };

      onValidationChange?.(newState.isValid);
      return newState;
    });

    logger.debug(`Field validation: ${String(field)}`, {
      field: String(field),
      value,
      errors: errorMessages,
      isValid: errorMessages.length === 0
    }, 'FormValidation');
  }, [formData, validation, onValidationChange]);

  /**
   * Validar todo el formulario
   */
  const validateForm = useCallback((): ValidationState => {
    const result = validationService.validateForm(formData, validation);
    
    setValidationState(result);
    onValidationChange?.(result.isValid);

    logger.debug('Form validation completed', {
      isValid: result.isValid,
      fieldErrors: Object.keys(result.fieldErrors).length,
      formErrors: result.formErrors.length
    }, 'FormValidation');

    return result;
  }, [formData, validation, onValidationChange]);

  /**
   * Actualizar un campo
   */
  const updateField = useCallback((field: keyof T, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Validar en tiempo real si está habilitado
    if (validateOnChange) {
      // Debounce la validación para evitar validaciones excesivas
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }

      validationTimeoutRef.current = setTimeout(() => {
        validateField(field);
      }, 300);
    }
  }, [validateOnChange, validateField]);

  /**
   * Actualizar múltiples campos
   */
  const updateFields = useCallback((updates: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...updates }));

    if (validateOnChange) {
      // Validar todos los campos actualizados
      Object.keys(updates).forEach(field => {
        validateField(field as keyof T);
      });
    }
  }, [validateOnChange, validateField]);

  /**
   * Marcar campo como tocado
   */
  const touchField = useCallback((field: keyof T) => {
    setValidationState(prev => ({
      ...prev,
      touchedFields: new Set([...prev.touchedFields, field as string])
    }));

    // Validar al hacer blur si está habilitado
    if (validateOnBlur) {
      validateField(field);
    }
  }, [validateOnBlur, validateField]);

  /**
   * Resetear el formulario
   */
  const resetForm = useCallback((newData?: Partial<T>) => {
    const resetData = newData ? { ...initialData, ...newData } : initialData;
    setFormData(resetData);
    setValidationState({
      fieldErrors: {},
      formErrors: [],
      isValid: true,
      hasValidated: false,
      touchedFields: new Set()
    });
    onValidationChange?.(true);

    logger.debug('Form reset', { hasNewData: !!newData }, 'FormValidation');
  }, [initialData, onValidationChange]);

  /**
   * Obtener errores de un campo
   */
  const getFieldErrors = useCallback((field: keyof T): string[] => {
    return validationState.fieldErrors[field as string] || [];
  }, [validationState.fieldErrors]);

  /**
   * Si un campo tiene errores
   */
  const hasFieldErrors = useCallback((field: keyof T): boolean => {
    return getFieldErrors(field).length > 0;
  }, [getFieldErrors]);

  /**
   * Si un campo ha sido tocado
   */
  const isFieldTouched = useCallback((field: keyof T): boolean => {
    return validationState.touchedFields.has(field as string);
  }, [validationState.touchedFields]);

  return {
    formData,
    validationState,
    isValid: validationState.isValid,
    hasValidated: validationState.hasValidated,
    updateField,
    updateFields,
    validateField,
    validateForm,
    resetForm,
    touchField,
    getFieldErrors,
    hasFieldErrors,
    isFieldTouched
  };
}
