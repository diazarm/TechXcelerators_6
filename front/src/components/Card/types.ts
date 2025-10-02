import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  onButtonClick?: () => void;
  className?: string;
}
