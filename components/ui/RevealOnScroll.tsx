'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
}

export const RevealOnScroll = ({ children, className = "", delay = 0 }: RevealOnScrollProps) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
      className={`transition-[opacity,translate,filter] duration-700 ease-(--ease-out-expo) ${
        isVisible
          ? 'opacity-100 translate-none filter-none'
          : 'opacity-0 translate-y-8 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
};
