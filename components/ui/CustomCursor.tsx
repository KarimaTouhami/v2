'use client';

import React, { useRef, useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let requestRef: number;
    let mouseX = 0;
    let mouseY = 0;
    
    const moveCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      requestRef = requestAnimationFrame(moveCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input'
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    requestRef = requestAnimationFrame(moveCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden md:block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ left: '-10px', top: '-10px', willChange: 'transform' }}
      aria-hidden="true"
    >
      <div className={`relative flex items-center justify-center transition-all duration-300 ease-out ${isPointer ? 'scale-150' : 'scale-100'}`}>
        <div className={`w-5 h-5 bg-white rounded-full opacity-90 transition-all duration-300 ${isPointer ? 'w-16 h-16 opacity-30' : ''}`}></div>
        {!isPointer && <div className="absolute w-2 h-2 bg-white rounded-full"></div>}
      </div>
    </div>
  );
};
