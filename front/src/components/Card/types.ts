import type { ReactNode } from 'react';

export interface CardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  leftHeaderContent?: ReactNode;
  rightHeaderContent?: ReactNode;
  image?: string;
  onButtonClick?: () => void;
  className?: string;
  isActive?: boolean;
}
