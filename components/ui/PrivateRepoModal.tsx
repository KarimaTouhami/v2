import React from 'react';
import { Lock, X } from 'lucide-react';

interface PrivateRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateRepoModal: React.FC<PrivateRepoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border-2 border-neutral-200 dark:border-neutral-800 max-w-lg w-full p-8 md:p-10 animate-in zoom-in-95 duration-300 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-6">
            <Lock size={36} className="text-yellow-600 dark:text-yellow-500" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-inter">
            Oops! Private Repository 🔒
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-6 leading-relaxed">
            This repository contains proprietary code for a client project and can&apos;t be shared publicly. 
          </p>

          <div className="bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-6 mb-8 border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
              <span className="font-bold text-neutral-900 dark:text-white">Why it&apos;s private:</span>
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              The code is under NDA and belongs to the company. But hey, I&apos;d be happy to discuss the technical challenges and solutions in an interview! 💼
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:opacity-90 transition-all shadow-lg font-inter"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
