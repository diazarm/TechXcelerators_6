import { useContext } from "react";
import HeaderContext from "./HeaderProvider";
import type { HeaderContextType } from "./types";

/**
 * useHeader Hook
 * 
 * Hook personalizado para gestionar el estado del header dinámico.
 * Permite actualizar títulos y subtítulos desde cualquier componente.
 */
export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};

export default HeaderContext;