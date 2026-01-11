import { PageContainerProps } from './types';

export function PageContainer({
  children,
  maxWidth = 'base',
  noPadding = false
}: PageContainerProps) {
  const widthClasses = {
    base: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-6xl',
  };

  return (
    <div className={`mx-auto ${widthClasses[maxWidth]} ${noPadding ? '' : 'px-6 lg:px-8'}`}>
      {children}
    </div>
  );
}
