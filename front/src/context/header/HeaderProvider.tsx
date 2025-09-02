import React, { createContext, useState, useCallback, ReactNode } from 'react';
import type { HeaderProps } from '../../components/Layout/types';

interface HeaderContextType {
  header: HeaderProps;
  setHeader: (header: HeaderProps) => void;
  updateHeader: (updates: Partial<HeaderProps>) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto del header que permite configurar el título y subtítulo
 * dinámicamente desde cualquier página
 */
export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [header, setHeaderState] = useState<HeaderProps>({
    title: 'scala',
    subtitle: 'Learning',
    showNavButton: true,
    className: ''
  });

  const setHeader = useCallback((newHeader: HeaderProps) => {
    setHeaderState(newHeader);
  }, []);

  const updateHeader = useCallback((updates: Partial<HeaderProps>) => {
    setHeaderState(prev => ({ ...prev, ...updates }));
  }, []);

  const value = {
    header,
    setHeader,
    updateHeader
  };

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContext;
