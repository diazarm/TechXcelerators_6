import { useContext } from "react";
import { HeaderContext } from '../context';
import type { HeaderContextType } from '../context/header/types';

/**
 * useHeader Hook
 * 
 * Hook personalizado para gestionar el estado del header dinámico.
 * Permite actualizar títulos desde cualquier componente.
 */
export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
