// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50: '#e6f1f9',
//           100: '#cce3f3',
//           200: '#99c7e8',
//           300: '#66abdc',
//           400: '#338fd0',
//           500: '#0073c4',
//           600: '#005c9d',
//           700: '#004576',
//           800: '#002e4f',
//           900: '#001728',
//         },
//         secondary: {
//           50: '#e6f7f2',
//           100: '#ccefe5',
//           200: '#99dfcb',
//           300: '#66cfb2',
//           400: '#33bf98',
//           500: '#00af7e',
//           600: '#008c65',
//           700: '#00694c',
//           800: '#004632',
//           900: '#002319',
//         },
//         accent: {
//           50: '#f0f9e6',
//           100: '#e1f3cc',
//           200: '#c3e799',
//           300: '#a5db66',
//           400: '#87cf33',
//           500: '#69c300',
//           600: '#549c00',
//           700: '#3f7500',
//           800: '#2a4e00',
//           900: '#152700',
//         },
//       },
//       fontFamily: {
//         sans: ['Inter', 'system-ui', 'sans-serif'],
//         heading: ['Montserrat', 'system-ui', 'sans-serif'],
//       },
//       spacing: {
//         '128': '32rem',
//       },
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#002e4f',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      }
    },
  },
  plugins: [],
}