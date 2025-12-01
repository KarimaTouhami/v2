import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-lg'
        }`}
      />
    </div>
  );
};
