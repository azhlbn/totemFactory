/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
      backgroundColor: {
        'card': 'var(--card-bg)',
      },
      borderColor: {
        'card': 'var(--card-border)',
      },
    },
  },
  plugins: [],
  // Отключаем предупреждения о неизвестных директивах
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // Принудительно включаем все стили
  safelist: [
    {
      pattern: /./,
    },
  ],
}