import { ContentStackProps } from './types';

export function ContentStack({
  children,
  spacing = 'md',
  as: Component = 'div'
}: ContentStackProps) {
  const spacingClasses = {
    sm: 'space-y-4',
    md: 'space-y-8',
    lg: 'space-y-12',
    xl: 'space-y-16',
  };

  return (
    <Component className={spacingClasses[spacing]}>
      {children}
    </Component>
  );
}
