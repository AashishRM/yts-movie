
const colors = require('tailwindcss/colors')
delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']

delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']

module.exports = {
    media: false, // or 'media' or 'class'
    theme: {
        fontSize: {
            xxs: '0.5rem',
            xs: '.75rem',
            sm: '.875rem',
            tiny: '.875rem',
            base: '1rem',
            md: '1.125rem',
            lg: '1.25rem',
            xl: '1.45rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
            '6xl': '4rem',
            '7xl': '5rem',
        },
        colors: {
            ...colors,
            primary: {
                50: '#E6F6FF',
                100: '#D1EEFF',
                200: '#ADDEFF',
                300: '#7BC5FF',
                400: '#489BFF',
                500: '#1F6FFF',
                600: '#004BFF',
                700: '#004FFF',
                800: '#0043DA',
                900: '#0637A9',
                950: '#03174C',
            },
            secondary: {
                50: '#fef2f2',
                100: '#fee2e2',
                200: '#fdcbcb',
                300: '#fba6a6',
                400: '#f67373',
                500: '#ef5a5a',
                600: '#da2828',
                700: '#b71e1e',
                800: '#981c1c',
                900: '#7e1e1e',
                950: '#440b0b',
            },
            neutral: {
                50: '#F9FAFB',
                100: '#F3F4F6',
                200: '#E5E7EB',
                300: '#D1D5DB',
                400: '#9CA3AF',
                500: '#6B7280',
                600: '#4B5563',
                700: '#374151',
                800: '#1F2937',
                900: '#111827',
            },
            success: {
                50: '#F0FDF4',
                100: '#DCFCE7',
                200: '#BBF7D0',
                300: '#86EFAC',
                400: '#4ADE80',
                500: '#22C55E',
                600: '#16A34A',
                700: '#15803D',
                800: '#166534',
                900: '#14532D',
            },
            gray: { ...colors.gray, neutral: '#D1D5DB' },
        },
        extend: {},
        spacing: {
            none: 0,
            xs: '8px',
            sm: '16px',
            md: '24px',
            lg: '32px',
            xl: '48px',
            xxl: '64px',
        },
        screens: {
            xs: '480px',
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
}
