import React, { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '',
  priority = false,
  fill = false,
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          onLoad={() => setIsLoaded(true)}
          className={`object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'
          }`}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 1200}
          height={height || 675}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'
          }`}
        />
      )}
    </div>
  );
};
