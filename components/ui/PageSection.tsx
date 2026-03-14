import type { PageSectionProps } from './types';

const spacingClasses = {
  xs: 'py-8',
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-20',
  xl: 'py-24',
  '2xl': 'py-32',
};

const backgroundClasses = {
  white: 'bg-white',
  cream: 'bg-gradient-to-b from-white to-eco-cream/30',
  gradient: 'bg-gradient-to-b from-eco-cream/30 to-white',
};

export function PageSection({
  children,
  spacing = 'lg',
  background = 'white',
  className = ''
}: PageSectionProps) {
  return (
    <section className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  );
}
