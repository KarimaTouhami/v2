'use client';

import { useSyncExternalStore } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function useReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

export const RevealOnScroll = ({ children, className = "", delay = 0 }: RevealOnScrollProps) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const isReducedMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ${
        isVisible && !isReducedMotion
          ? 'opacity-100 translate-y-0 filter-none' 
          : 'opacity-0 translate-y-12 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
};
