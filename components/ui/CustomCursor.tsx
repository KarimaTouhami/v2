'use client';

import React, { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], [role="option"], label, select, summary';
const TEXT_ENTRY = 'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

/**
 * Same look as before (difference-blended dot that blooms over links), but:
 * - no React re-render per mouse move: everything is written straight to the DOM
 * - the ring eases toward the pointer, the dot tracks it 1:1
 * - hides over text fields so the native caret shows through
 * - only activates on fine pointers; touch devices keep the system cursor
 */
export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduceMotion ? 1 : 0.2;

    let targetX = -100;
    let targetY = -100;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;
    let state = '';

    const setState = (next: string) => {
      if (next === state) return;
      state = next;
      ring.dataset.state = next;
      dot.dataset.state = next;
    };

    const tick = () => {
      ringX += (targetX - ringX) * ease;
      ringY += (targetY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      frame =
        Math.abs(targetX - ringX) > 0.1 || Math.abs(targetY - ringY) > 0.1
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (state === '' || state === 'hidden') {
        // First move (or re-entry): jump instead of sliding in from the corner.
        ringX = targetX;
        ringY = targetY;
      }
      const el = e.target instanceof Element ? e.target : null;
      if (el?.closest(TEXT_ENTRY)) setState('text');
      else if (el?.closest(INTERACTIVE)) setState('pointer');
      else setState('default');
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onDown = () => ring.classList.add('scale-75');
    const onUp = () => ring.classList.remove('scale-75');
    const onLeave = () => setState('hidden');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hidden md:contents">
      <div
        ref={ringRef}
        data-state="hidden"
        className="group/cursor pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference -ml-2.5 -mt-2.5 transition-[opacity,scale] duration-300 ease-out will-change-transform data-[state=hidden]:opacity-0 data-[state=text]:opacity-0"
      >
        <div className="h-5 w-5 rounded-full bg-white opacity-90 transition-all duration-300 ease-(--ease-out-expo) group-data-[state=pointer]/cursor:scale-[4.8]" />
      </div>
      <div
        ref={dotRef}
        data-state="hidden"
        className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference -ml-1 -mt-1 h-2 w-2 rounded-full bg-white transition-opacity duration-200 will-change-transform data-[state=hidden]:opacity-0 data-[state=pointer]:opacity-0 data-[state=text]:opacity-0"
      />
    </div>
  );
};
