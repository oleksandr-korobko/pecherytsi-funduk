export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type MaxWidth = 'narrow' | 'medium' | 'wide' | 'full';
export type GridColumns = 1 | 2 | 3 | 4;

export interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: MaxWidth;
  className?: string;
}

export interface PageSectionProps {
  children: React.ReactNode;
  spacing?: SpacingSize;
  background?: 'white' | 'cream' | 'gradient';
  className?: string;
}

export interface GridProps {
  children: React.ReactNode;
  columns?: GridColumns;
  gap?: SpacingSize;
  className?: string;
}

export interface CardProps {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  gradient?: string;
  className?: string;
  onClick?: () => void;
}
