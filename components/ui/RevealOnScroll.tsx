import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 cubic-bezier(0.17, 0.55, 0.55, 1) ${
        isVisible 
          ? 'opacity-100 translate-y-0 filter-none' 
          : 'opacity-0 translate-y-12 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
};
