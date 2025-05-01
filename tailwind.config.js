/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#faf6f2',
            100: '#f5ede5',
            200: '#ead9c9',
            300: '#ddc2a7',
            400: '#cca685',
            500: '#b88c6d', // Color acento
            600: '#a67257',
            700: '#8a5c48',
            800: '#714c3e',
            900: '#5d4035',
            950: '#2d1f19',
          },
          secondary: {
            50: '#f9f3ee', // Color secundario claro
            100: '#f2e8de',
            200: '#e4d2c3', // Color secundario
            300: '#d5b8a3',
            400: '#c49980',
            500: '#b37e66',
            600: '#a06457',
            700: '#845147',
            800: '#6d433c',
            900: '#5b3933',
            950: '#301c19',
          },
          body: {
            50: '#f7f7f7',
            100: '#e3e3e3',
            200: '#c8c8c8',
            300: '#a4a4a4',
            400: '#818181',
            500: '#666666',
            600: '#4a4a4a', // Color texto principal
            700: '#3d3d3d',
            800: '#2d2d2d',
            900: '#1a1a1a',
            950: '#0a0a0a',
          },
        },
        fontFamily: {
          heading: ['Cormorant Garamond', 'serif'],
          body: ['Montserrat', 'sans-serif'],
        },
        spacing: {
          '128': '32rem',
        },
        height: {
          '128': '32rem',
        },
        maxWidth: {
          '8xl': '90rem',
        },
        backgroundImage: {
          'hero-pattern': "url('/images/hero-bg.jpg')",
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme('colors.body.600'),
              h1: {
                fontFamily: theme('fontFamily.heading'),
                fontWeight: '500',
              },
              h2: {
                fontFamily: theme('fontFamily.heading'),
                fontWeight: '500',
              },
              h3: {
                fontFamily: theme('fontFamily.heading'),
                fontWeight: '500',
              },
              h4: {
                fontFamily: theme('fontFamily.heading'),
                fontWeight: '500',
              },
              a: {
                color: theme('colors.primary.500'),
                '&:hover': {
                  color: theme('colors.primary.700'),
                },
              },
            },
          },
        }),
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
  }