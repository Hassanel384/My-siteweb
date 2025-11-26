import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        claritas: {
          orange: '#FF6B3D',
          'orange-light': '#FF8A66',
          'orange-dark': '#E65A2F',
        },
      },
    },
  },
  plugins: [],
}
export default config
