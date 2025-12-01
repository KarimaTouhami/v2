module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    // Performance rules
    'react/no-array-index-key': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Code quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
    
    // TypeScript specific
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Accessibility
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',
  },
};
