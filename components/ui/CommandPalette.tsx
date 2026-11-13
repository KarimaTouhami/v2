'use client';

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  CornerDownLeft,
  FolderGit2,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { useTheme } from '@/hooks/useTheme';

export const OPEN_PALETTE_EVENT = 'command-palette:open';

/** Opens the palette from anywhere (nav button, hero hint, ...). */
export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

const noopSubscribe = () => () => {};

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere (defaults to ⌘K during SSR). */
export const useShortcutLabel = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K'),
    () => '⌘K',
  );

type Command = {
  id: string;
  group: 'Pages' | 'Projects' | 'Actions' | 'Elsewhere';
  label: string;
  hint?: string;
  keywords?: string;
  icon: React.ReactNode;
  run: () => void;
};

export const CommandPalette: React.FC = () => {
  const pathname = usePathname();
  // Remember which route the palette was opened on: navigating anywhere else
  // (palette, back button, link) closes it without an extra effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenOn((current) => (current === window.location.pathname ? null : window.location.pathname));
      }
    };
    const onOpen = () => setOpenOn(window.location.pathname);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  return open ? <PaletteDialog onClose={() => setOpenOn(null)} /> : null;
};

/** Mounted fresh on every open, so query and selection always start clean. */
const PaletteDialog: React.FC<{ onClose: () => void }> = ({ onClose: close }) => {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const shortcut = useShortcutLabel();

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => router.push(href);
    const external = (href: string) => () => window.open(href, '_blank', 'noopener,noreferrer');
    const iconSize = 16;

    return [
      { id: 'home', group: 'Pages', label: 'Home', icon: <Home size={iconSize} />, run: go('/') },
      { id: 'projects', group: 'Pages', label: 'Projects', keywords: 'work portfolio', icon: <FolderGit2 size={iconSize} />, run: go('/projects') },
      { id: 'stack', group: 'Pages', label: 'Tech Stack', keywords: 'skills tools', icon: <Layers size={iconSize} />, run: go('/stack') },
      { id: 'contact', group: 'Pages', label: 'Contact', keywords: 'hire email message', icon: <Mail size={iconSize} />, run: go('/contact') },
      ...PROJECTS.map<Command>((p) => ({
        id: `project-${p.id}`,
        group: 'Projects',
        label: p.title,
        hint: p.category,
        keywords: `${p.company} ${p.stack.join(' ')} ${p.year}`,
        icon: <ArrowRight size={iconSize} />,
        run: go(`/projects/${p.id}`),
      })),
      {
        id: 'theme',
        group: 'Actions',
        label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
        keywords: 'theme dark light appearance',
        icon: isDark ? <Sun size={iconSize} /> : <Moon size={iconSize} />,
        run: () => toggleTheme(),
      },
      { id: 'github', group: 'Elsewhere', label: 'GitHub', hint: '@KarimaTouhami', icon: <Github size={iconSize} />, run: external('https://github.com/KarimaTouhami') },
      { id: 'linkedin', group: 'Elsewhere', label: 'LinkedIn', icon: <Linkedin size={iconSize} />, run: external('https://linkedin.com/in/karimatouhami') },
      { id: 'medium', group: 'Elsewhere', label: 'Medium', keywords: 'blog writing articles', icon: <BookOpen size={iconSize} />, run: external('https://medium.com/@karimatouhami') },
    ];
  }, [router, isDark, toggleTheme]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const terms = q.split(/\s+/);
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.hint ?? ''} ${c.keywords ?? ''} ${c.group}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [commands, query]);

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    close();
    command.run();
  };

  /* Focus the input, lock page scroll, and hand focus back on close. */
  useEffect(() => {
    const restoreFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (restoreFocus?.isConnected) restoreFocus.focus();
    };
  }, []);

  /* Keep the highlighted row visible. */
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(results[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      // Focus stays in the input; Tab moves through results like arrows.
      e.preventDefault();
      setActive((i) => (results.length ? (i + (e.shiftKey ? -1 : 1) + results.length) % results.length : 0));
    }
  };

  let lastGroup: Command['group'] | null = null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh] bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300"
      >
        <div className="flex items-center gap-3 px-4 border-b border-neutral-200 dark:border-neutral-800">
          <Search size={18} className="text-neutral-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Search pages, projects, actions..."
            className="w-full bg-transparent py-4 text-base text-neutral-900 dark:text-white placeholder-neutral-400 outline-none focus-visible:outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-flex shrink-0 items-center rounded-md border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
            ESC
          </kbd>
        </div>

        <div ref={listRef} id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && (
            <p className="px-3 py-10 text-center text-sm text-neutral-500">
              Nothing matches &ldquo;{query}&rdquo;.
            </p>
          )}

          {results.map((cmd, i) => {
            const showGroup = cmd.group !== lastGroup;
            lastGroup = cmd.group;
            const isActive = i === active;
            return (
              <React.Fragment key={cmd.id}>
                {showGroup && (
                  <div className="px-3 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-widest text-neutral-400" role="presentation">
                    {cmd.group}
                  </div>
                )}
                <div
                  id={`cmd-${cmd.id}`}
                  data-index={i}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => active !== i && setActive(i)}
                  onClick={() => runCommand(cmd)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm cursor-pointer transition-colors duration-150 ${
                    isActive
                      ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                      isActive
                        ? 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    {cmd.icon}
                  </span>
                  <span className="font-medium truncate">{cmd.label}</span>
                  {cmd.hint && <span className="text-xs text-neutral-400 truncate">{cmd.hint}</span>}
                  {isActive && <CornerDownLeft size={14} className="ml-auto shrink-0 text-neutral-400" aria-hidden="true" />}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-4 border-t border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>↵</Kbd> open
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Kbd>{shortcut}</Kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
};

const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="inline-flex min-w-5 items-center justify-center rounded border border-neutral-200 dark:border-neutral-700 px-1 font-mono text-[10px]">
    {children}
  </kbd>
);
