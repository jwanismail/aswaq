/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ASWAQ Brand Colors - Logo uyumlu renk paleti
        'aswaq': {
          50: '#fffbeb',   // Çok açık sarı
          100: '#fef3c7',  // Açık sarı
          200: '#fde68a',  // Orta açık sarı
          300: '#fcd34d',  // Ana sarı (Logo)
          400: '#fbbf24',  // Koyu sarı
          500: '#FFC107',  // Ana brand rengi (Logo background)
          600: '#d97706',  // Koyu brand
          700: '#b45309',  // Çok koyu brand
          800: '#92400e',  // Kahverengi ton
          900: '#78350f',  // En koyu ton
        },
        'aswaq-secondary': {
          500: '#2563eb',  // Mavi (butonlar için)
          600: '#1d4ed8',
          700: '#1e40af',
        },
        'aswaq-success': {
          500: '#10b981',  // Yeşil (başarı mesajları)
          600: '#059669',
        },
        'aswaq-danger': {
          500: '#ef4444',  // Kırmızı (hata mesajları)
          600: '#dc2626',
        },
        'aswaq-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 