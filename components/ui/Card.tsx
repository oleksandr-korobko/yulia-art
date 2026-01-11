import Link from 'next/link';
import Image from 'next/image';
import { CardProps } from './types';

export function Card({
  image,
  title,
  subtitle,
  href,
  aspectRatio = '4/3',
  className = ''
}: CardProps) {
  const aspectClasses = {
    '4/3': 'aspect-[4/3]',
    '3/4': 'aspect-[3/4]',
    'square': 'aspect-square',
  };

  const content = (
    <>
      {image && (
        <div className={`relative ${aspectClasses[aspectRatio]} bg-gray-100 overflow-hidden mb-4 rounded-lg`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <h3 className="text-lg font-light text-gray-900 group-hover:text-gray-600 transition-colors">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`group block transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`group ${className}`}>
      {content}
    </div>
  );
}
