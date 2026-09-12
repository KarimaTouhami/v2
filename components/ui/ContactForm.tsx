'use client';

import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  "w-full bg-neutral-50 dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors";

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: '', email: '', message: '', company: '' });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Name
          </label>
          <input
            id="cf-name"
            required
            type="text"
            placeholder="Your name"
            autoComplete="name"
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Email
          </label>
          <input
            id="cf-email"
            required
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Message
        </label>
        <textarea
          id="cf-message"
          required
          rows={6}
          placeholder="Tell me about your project or opportunity..."
          className={inputClass}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-sm md:text-base hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
            <CheckCircle2 size={18} /> Thanks — I&apos;ll get back to you.
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium text-sm">
            <AlertCircle size={18} /> Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  );
};