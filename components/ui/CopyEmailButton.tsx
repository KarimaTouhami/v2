'use client';

import React, { useState } from 'react';
import { Mail, Copy, CheckCircle2 } from 'lucide-react';

export const CopyEmailButton: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText("contact@karima.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
      aria-label="Copy email address"
    >
      <Mail size={18} className="text-neutral-600 dark:text-neutral-300" />
      <span className="text-sm font-medium text-neutral-900 dark:text-white">
        {copied ? "Copied!" : "Copy Email"}
      </span>
      {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
    </button>
  );
};
