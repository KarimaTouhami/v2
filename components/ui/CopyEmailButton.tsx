'use client';

import React, { useState } from 'react';
import { Mail, Copy, CheckCircle2 } from 'lucide-react';

export const CopyEmailButton: React.FC = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText("karimatouhami246@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg font-medium"
      aria-label="Copy email address"
    >
      <Mail size={20} />
      <span className="text-sm font-semibold">
        {copied ? "Copied!" : "Copy Email"}
      </span>
      {copied ? <CheckCircle2 size={18} className="text-green-400" /> : <Copy size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />}
    </button>
  );
};
