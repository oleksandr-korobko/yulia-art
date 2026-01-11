import { FooterContainerProps } from './types';

export function FooterContainer({ children }: FooterContainerProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      {children}
    </div>
  );
}
