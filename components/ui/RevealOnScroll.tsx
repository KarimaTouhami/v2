'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealOnScroll = ({ children, className = "", delay = 0 }: RevealOnScrollProps) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none' 
          : 'opacity-0 translate-y-12 blur-sm'
      } ${className}`}
    >
      {children}
    </div>
  );
};
