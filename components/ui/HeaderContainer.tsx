import { HeaderContainerProps } from './types';

export function HeaderContainer({ children }: HeaderContainerProps) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-8 lg:max-w-7xl lg:px-8">
      {children}
    </div>
  );
}
