'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';

interface GalleryProps {
  images: string[];
  workTitle: string;
}

export function Gallery({ images, workTitle }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="space-y-16 lg:space-y-24">
        {images.map((image, index) => (
          <figure
            key={index}
            className="group cursor-pointer"
            onClick={() => setLightboxIndex(index)}
          >
            <div className="relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl">
              <Image
                src={image}
                alt={`${workTitle} - View ${index + 1}`}
                width={1400}
                height={900}
                className="w-full transition-transform duration-500 group-hover:scale-105"
              />
              {/* Zoom indicator overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          workTitle={workTitle}
        />
      )}
    </>
  );
}
