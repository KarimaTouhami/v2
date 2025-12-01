import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, href = "#" }) => (
  <a 
    href={href} 
    aria-label={label} 
    className="p-4 bg-white dark:bg-neutral-900 rounded-full border-2 border-neutral-200 dark:border-neutral-800 hover:scale-110 active:scale-95 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 text-neutral-600 dark:text-neutral-400 shadow-md hover:shadow-lg"
  >
    {icon}
  </a>
);
