/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors based on Figma design
        'primary-indigo': '#5F6EEC', 'primary-cyan': '#16DAE0', 'text-dark': '#111827',
        'text-medium': '#374151', 'text-light': '#4B5563', 'text-placeholder': '#ADAEBC',
        'border-light': '#E5E7EB', 'border-medium': '#D1D5DB', 'bg-page': '#F8FAFC',
        'bg-card': '#FFFFFF', 'bg-header-overlay': 'rgba(255, 255, 255, 0.15)',
        'gradient-start': '#5F6EEC', 'gradient-end': '#16DAE0', 'blue-banner-light': '#DBEAFE',
        'blue-action-bg': 'rgba(197, 211, 255, 0.3)', 'blue-action-border': 'rgba(197, 211, 255, 0.3)',
        'blue-action-text': '#5F7EED', 'blue-recommendation-bg': 'rgba(197, 211, 255, 0.3)',
        'blue-recommendation-border': 'rgba(197, 211, 255, 0.3)', 'orange-warning-bg': 'rgba(249, 115, 22, 0.1)',
        'orange-warning-border': 'rgba(249, 115, 22, 0.2)', 'orange-warning-text': '#F97316',
        'teal-score-bg': 'rgba(23, 217, 224, 0.15)', 'teal-score-text': '#109EA2',
        'cyan-tag-bg': '#E8FBFC', 'emerald-tag-text': '#166534', 'indigo-tag-bg': '#EEF2FF',
        'blue-tag-text': '#1E40AF', 'purple-tip-bg': '#FAF5FF', 'red-log-bg': '#FEE2E2',
        'red-log-icon': '#DC2626', 'blue-log-bg': '#DBEAFE', 'blue-log-icon': '#2563EB',
        'yellow-log-bg': '#FEF9C3', 'yellow-log-icon': '#CA8A04', 'purple-log-bg': '#F3E8FF',
        'purple-log-icon': '#9333EA', 'emerald-log-bg': '#DCFCE7', 'emerald-log-icon': '#16A34A',
        'orange-log-bg': '#FFEDD5', 'orange-log-icon': '#EA580C', 'gray-icon': '#9CA3AF',
          },
          fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
          },
        },
      },
      plugins: [],
    };