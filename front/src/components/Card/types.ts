import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  onButtonClick?: () => void;
  className?: string;
}
