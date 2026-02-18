import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Tokens (Based on UI/UX Specs - Dark Mode)
        background: {
          DEFAULT: '#1F1F1F', // color-bg
          backdrop: 'rgba(54, 54, 54, 0.2)', // color-bg-backdrop (approx based on Black/black-700 20%)
          black: '#F5F5F5', // color-bg-black (Dark Mode: Black/black-100)
          
          // Button - Primary
          'button-primary-default': '#C7D2FE', // Pigment Indigo / Indigo-200
          'button-primary-hover': '#A5B4FC',
          'button-primary-pressed': '#818CF8',
          
          // Button - Secondary
          'button-secondary-default': '#312E81', // Pigment Indigo / Indigo-900 (Approx)
          
          // Button - Outlined
          'button-outlined-default': '#363636', // Black/black-800
          'button-outlined-hover': '#1F1F1F',
          'button-outlined-pressed': '#0A0A0A',
          
          // Button - Danger
          'button-danger-default': '#FECACA',
          'button-danger-hover': '#FCA5A5',
          'button-danger-pressed': '#F87171',
          
          // Button - Success
          'button-success-default': '#DCFCE7',
          'button-success-hover': '#BBF7D0',
          'button-success-pressed': '#86EFAC',
          
          // Button - Warning
          'button-warning-default': '#FDE68A', 
          'button-warning-hover': '#FCD34D',
          'button-warning-pressed': '#FBBF24',

          // Fills
          'fill-primary': '#818CF8', 
          'fill-secondary': '#22C55E', // Scooter / Green-400 (From image)
          'fill-danger': '#F87171',
          'fill-success': '#4ADE80',
          'fill-warning': '#FBBF24',
          'fill-neutral': '#E5E5E5', 
          'fill-info': '#60A5FA',

          // Surfaces
          'surface-neutral': '#0A0A0A', // Black/black-950
          'surface-primary': '#293047', // Main/Pigment-Indigo-900
          'surface-success': '#14532D',
          'surface-warning': '#78350F',
          'surface-danger': '#7F1D1D',
          'surface-info': '#1E3A8A',
          
          // Tags
          'tag-primary': 'rgba(99, 102, 241, 0.2)', // Pigment Indigo 20%
          'tag-success': 'rgba(34, 197, 94, 0.2)',
          'tag-warning': 'rgba(245, 158, 11, 0.2)',
          'tag-danger': 'rgba(239, 68, 68, 0.2)',
          'tag-info': 'rgba(59, 130, 246, 0.2)',
          
          // Form
          form: '#404040',
        },
        border: {
          // Button - Focused
          'button-focused': 'rgba(255, 236, 172, 0.33)', // Red/red-200 20% ? Image says #FECACA33 for danger-focused
          'button-danger-focused': 'rgba(254, 202, 202, 0.33)', // Red/red-200 20%
          'button-focused-secondary': '#C29BEF33', // Pigment Indigo 20%
          'button-info-focused': '#BFDBFE33', // Blue/blue-200 20%
          
          // Button - Outlined
          'button-outlined-default': '#9E9E9E', // Black/black-500
          'button-outlined-focused': '#A5B4FC', // Pigment Indigo 300
          'button-outlined-pressed': '#C2C2C2', // Black/black-400
          'button-outlined-secondary': '#FFFFFF', // Black/black-50
          
          // Button - State Focused
          'button-success-focused': '#BBF7D033', // Green/green-200 20%
          'button-warning-focused': '#FDE68A33', // Orange/orange-200 20%

          // Semantic Borders
          danger: '#991B1B', // Red/red-800
          disabled: '#616161', // Black/black-700
          
          // Fills
          'fill-danger': '#FECACA',
          'fill-info': '#BFDBFE',
          'fill-neutral': '#C2C2C2',
          'fill-primary': '#C29BEF', // Pigment Indigo 200
          'fill-secondary': '#A5EFFC', // Scooter 200
          'fill-success': '#BBF7D0',
          'fill-warning': '#FDE68A',

          // Forms
          'form-danger': '#FCA5A5',
          'form-default': '#616161', // Black/black-700

          // Semantic Colors
          info: '#1E40AF', // Blue/blue-800
          neutral: '#404040', // Black/black-800
          'neutral-2': '#404040',
          'neutral-dark': '#404040',
          
          primary: '#3B1166', // Red/red-300 ?? Image says Pigment Indigo 800 -> #381166 approx
          secondary: '#156775', // Scooter 800
          success: '#166534', // Green/green-800
          warning: '#92400E', // Orange/orange-800
          white: '#404040', // Black/black-800
        },
        icon: {
          // Button Icons
          'button-danger': '#7F1D1D', // Red/red-900
          'button-outlined': '#C29BEF', // Pigment Indigo 200
          'button-outlined-secondary': '#FFFFFF', // Black/black-50
          'button-primary': '#293047', // Pigment Indigo 900
          'button-secondary-default': '#F3EAFB', // Pigment Indigo 50
          'button-secondary-hover': '#E0CDF7', // Pigment Indigo 100
          'button-secondary-pressed': '#C29BEF', // Pigment Indigo 200
          'button-success': '#14532D', // Green/green-800
          'button-warning': '#78350F', // Orange/orange-900

          // Semantic Icons
          danger: '#FECACA', // Red/red-200
          disabled: '#757575', // Black/black-600
          info: '#BFDBFE', // Blue/blue-200
          
          'neutral-primary': '#FFFFFF', // Black/black-50
          'neutral-secondary': '#E0E0E0', // Black/black-300
          
          primary: '#C29BEF', // Pigment Indigo 200
          secondary: '#A5EFFC', // Scooter 200
          success: '#BBF7D0', // Green/green-200
          warning: '#FDE68A', // Orange/orange-200
          
          'white-primary': '#0A0A0A', // Black/black-950 (Note: Dark icon for light context)
        },
        text: {
          // Button Text
          'button-danger': '#7F1D1D', // Red/red-900
          'button-outlined': '#C29BEF', // Pigment Indigo 200
          'button-outlined-secondary': '#FFFFFF', // Black/black-50
          'button-primary': '#293047', // Pigment Indigo 900
          'button-secondary-default': '#F3EAFB', // Pigment Indigo 50
          'button-secondary-hover': '#E0CDF7', // Pigment Indigo 100
          'button-secondary-pressed': '#C29BEF', // Pigment Indigo 200
          'button-success': '#14532D', // Green/green-900
          'button-warning': '#78350F', // Orange/orange-900

          // Semantic Text
          danger: '#FECACA', // Red/red-200
          disabled: '#757575', // Black/black-600
          info: '#BFDBFE', // Blue/blue-200
          
          'neutral-primary': '#FFFFFF', // Black/black-50
          'neutral-secondary': '#E0E0E0', // Black/black-300
          
          primary: '#C29BEF', // Pigment Indigo 200
          secondary: '#A5EFFC', // Scooter 200
          success: '#BBF7D0', // Green/green-200
          warning: '#FDE68A', // Orange/orange-200
          
          'white-primary': '#0A0A0A', // Black/black-950
          'white-secondary': '#404040', // Black/black-800
        },
      },
      fontFamily: {
        gaming: ['"Outfit"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
      },
      borderRadius: {
        'game': '2px', // Sharper corners for game UI
      },
      zIndex: {
        'hud': '100', // Heads-up display layer
        'modal': '200',
        'overlay': '300',
      }
    }
  },
  plugins: []
}
