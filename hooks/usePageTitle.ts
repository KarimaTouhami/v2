import { useEffect } from 'react';

export const usePageTitle = (title: string | null) => {
  useEffect(() => {
    document.title = title ? `${title} | Karima Touhami` : 'Karima Touhami | Software Engineer';
  }, [title]);
};
