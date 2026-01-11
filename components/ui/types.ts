import { ReactNode } from 'react';

// PageContainer
export interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'base' | 'narrow' | 'wide';
  noPadding?: boolean;
}

// PageSection
export interface PageSectionProps {
  children: ReactNode;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// ContentStack
export interface ContentStackProps {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'div' | 'section' | 'article';
}

// Grid
export interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Card
export interface CardProps {
  image?: string;
  title: string;
  subtitle?: string;
  href?: string;
  aspectRatio?: '4/3' | '3/4' | 'square';
  className?: string;
}

// HeaderContainer
export interface HeaderContainerProps {
  children: ReactNode;
}

// FooterContainer
export interface FooterContainerProps {
  children: ReactNode;
}
