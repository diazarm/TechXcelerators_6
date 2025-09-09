/**
 * Tipos para el contexto de Header
 */

import type { ReactNode } from 'react';
import type { HeaderProps } from '../../components/Layout/types';

export interface HeaderContextType {
  header: HeaderProps;
  setHeader: (header: HeaderProps) => void;
  updateHeader: (updates: Partial<HeaderProps>) => void;
}

export interface HeaderProviderProps {
  children: ReactNode;
}
