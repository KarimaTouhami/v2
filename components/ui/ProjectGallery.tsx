'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { LazyImage } from './LazyImage';
import type { ProjectImage } from '@/data/projects';

interface ProjectGalleryProps {
  images: ProjectImage[];
  title: string;
  className?: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title, className = '' }) => {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const hasInteracted = useRef(false);

  const safeIndex = total > 0 ? Math.min(index, total - 1) : 0;
  const current = images[safeIndex];

  const go = useCallback(
    (delta: number) => {
      if (total < 2) return;
      hasInteracted.current = true;
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  const show = useCallback((next: number) => {
    hasInteracted.current = true;
    setIndex(next);
  }, []);

  /* Keep the active thumbnail in view without yanking the page on first paint. */
  useEffect(() => {
    if (!hasInteracted.current) return;
    const node = thumbRefs.current[safeIndex];
    if (!node) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    node.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [safeIndex]);

  /* Lightbox: scroll lock, focus management, keyboard shortcuts and focus trap. */
  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [isOpen, go]);

  if (total === 0) return null;

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
    touchStartX.current = null;
  };

  const arrowClasses =
    'absolute top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/45 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-black/70 focus-visible:opacity-100';

  return (
    <div className={`w-full ${className}`}>
      <div
        className="group relative aspect-16/10 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-2xl shadow-neutral-300/20 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-black/40"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${title} images`}
      >
        <LazyImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label={`Open image ${safeIndex + 1} of ${total} full screen: ${current.alt}`}
        />

        <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          <Expand size={13} aria-hidden="true" />
          {safeIndex + 1} / {total}
        </span>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className={`${arrowClasses} left-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100`}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={`${arrowClasses} right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100`}
              aria-label="Next image"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {(total > 1 || current.caption) && (
        <div className="mt-3 flex flex-col gap-3">
          {current.caption && (
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{current.caption}</p>
          )}

          {total > 1 && (
            <div className="-mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {images.map((image, i) => (
                <button
                  key={image.src}
                  ref={(node) => {
                    thumbRefs.current[i] = node;
                  }}
                  type="button"
                  onClick={() => show(i)}
                  aria-label={`Show image ${i + 1}: ${image.alt}`}
                  aria-current={i === safeIndex ? 'true' : undefined}
                  className={`relative aspect-4/3 w-24 shrink-0 snap-start overflow-hidden rounded-xl border-2 transition-all duration-300 sm:w-28 ${
                    i === safeIndex
                      ? 'border-neutral-900 opacity-100 dark:border-white'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="96px"
                    quality={70}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image gallery`}
            className="fixed inset-0 z-[200] flex flex-col bg-black/95 text-white backdrop-blur-md"
          >
            <div
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 cursor-zoom-out"
            />

            <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                {title}
                <span className="mx-2 text-white/25">/</span>
                {String(safeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="shrink-0 rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
                aria-label="Close gallery"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div
              className="relative z-10 min-h-0 flex-1"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onClick={(event) => {
                if (event.target === event.currentTarget) setIsOpen(false);
              }}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                priority
                sizes="100vw"
                quality={90}
                className="object-contain px-2 pb-2 sm:px-16"
              />

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20 sm:left-6"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20 sm:right-6"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="relative z-10 shrink-0 px-4 pb-6 pt-2 text-center">
              {current.caption && (
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70">{current.caption}</p>
              )}
              <p className="sr-only" aria-live="polite">
                Image {safeIndex + 1} of {total}: {current.alt}
              </p>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
