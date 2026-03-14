import type { PageContainerProps } from './types';

const maxWidthClasses = {
  narrow: 'max-w-4xl',
  medium: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
};

export function PageContainer({
  children,
  maxWidth = 'wide',
  className = ''
}: PageContainerProps) {
  return (
    <div className={`container mx-auto px-4 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}
