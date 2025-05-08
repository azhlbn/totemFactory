/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        'secondary-dark': 'var(--secondary-dark)',
        accent: 'var(--accent)',
        'accent-dark': 'var(--accent-dark)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      backgroundColor: {
        'card': 'rgba(10, 10, 20, 0.8)',
      },
      borderColor: {
        'card': 'rgba(255, 56, 100, 0.2)',
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // Используем более специфичный safelist вместо агрессивного pattern: /./
  safelist: [
    'bg-primary',
    'bg-secondary',
    'text-primary',
    'text-secondary',
    'border-primary',
    'border-secondary',
    'hover:bg-primary',
    'hover:bg-secondary',
    'hover:text-primary',
    'hover:text-secondary',
    'hover:border-primary',
    'hover:border-secondary',
  ],
}