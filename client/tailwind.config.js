/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          dark: '#202225',
          darker: '#1a1b1e',
          darkest: '#0d0e10',
          gray: '#36393f',
          lightgray: '#40444b',
          text: '#dcddde',
          'text-muted': '#72767d',
          blurple: '#5865f2',
          green: '#57f287',
        }
      }
    },
  },
  plugins: [],
}

