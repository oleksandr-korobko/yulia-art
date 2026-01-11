import { PageSectionProps } from './types';

export function PageSection({
  children,
  spacing = 'md',
  className = ''
}: PageSectionProps) {
  const spacingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 lg:py-24',
    xl: 'py-24 sm:py-32',
  };

  return (
    <section className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
