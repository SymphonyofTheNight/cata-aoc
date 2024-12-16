/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '!./node_modules/**', // Exclude everything in node_modules to speed up builds
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        primary: '#053FB0',
        secondary: '#3071EF',
        white: '#FFFFFF',
        error: {
          DEFAULT: '#AD0000',
          secondary: '#C62828',
        },
        success: {
          DEFAULT: '#146622',
          secondary: '#388E3C',
        },
        gray: {
          100: '#F1F3F5',
          200: '#CFD8DC',
          300: '#AFBAC5',
          400: '#90A4AE',
          500: '#546E7A',
          600: '#091D45',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      borderColor: {
        DEFAULT: '#CFD8DC',
      },
      keyframes: {
        revealVertical: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
        revealVertical: 'revealVertical 400ms forwards cubic-bezier(0, 1, 0.25, 1)',
      },
      backgroundColor: {
        "primary-bg-color": "#AD1A2E",
        "secondary-bg-color": "#4D4D4F"
      },
      backgroundImage: {
        "hero-banner": "url('https://cdn11.bigcommerce.com/s-t0676dlrio/images/stencil/original/image-manager/hero-banner2x.png?t=1730268778')",
        "kromer-country": "url('https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/kromercountryimage.jpg?t=1712200908')",
        "kromer-footer-bg1": "url('https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/email-bg.jpg?t=1712027736')",
        "kromer-footer-bg2": "url('https://cdn11.bigcommerce.com/s-3vdgh6wtox/images/stencil/original/image-manager/factory-bg.jpg?t=1712027738')",
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },

  plugins: [
    // @ts-ignore
    require('tailwindcss-radix')(),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
  ],
};

module.exports = config;
