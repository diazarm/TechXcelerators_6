import { useContext } from "react";
import HeaderContext from "./HeaderProvider";
import type { HeaderProps } from "../../components/Layout/types";

interface HeaderContextType {
  header: HeaderProps;
  setHeader: (header: HeaderProps) => void;
  updateHeader: (updates: Partial<HeaderProps>) => void;
}

/**
 * Hook personalizado para usar el contexto del header
 * @returns El contexto del header con métodos para configurarlo
 */
export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};

export default HeaderContext;