/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
    screens:{
     '3xl':{min:'1800px',max:'1950px'}
    },
     fontFamily:{
      roboto:'roboto',
      poppins:'poppins'
     },
      colors: {
        'off-white': '#f5f5f5',
        'l-black':'#393939',
        'eee':'#fafafa',
         },

    },
  },
  plugins: [
  ],
}