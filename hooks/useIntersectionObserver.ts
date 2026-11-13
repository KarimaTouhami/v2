import { useRef, useState, useEffect } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.1, rootMargin = '0px' } = options;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold, rootMargin });

    observer.observe(currentElement);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [elementRef, isVisible] as const;
};
