module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  // purge: [],
  purge: {
    enabled: true,
    content: ['./dist/*.html'],
  },
  theme: {
    extend: {
      colors: {
        green: {
          '100': '#f2f7f6',
          '200': '#e6efec',
          '300': '#d1e3dd',
          '400': '#83d0c7',
          '500': '#67a28e',
          '600': '#558b79',
          '700': '#467263',
          '800': '#36594d',
          '900': '#1f332c',
        },
        gray: {
          '100': '#aaadb1',
          '300': '#808489',
          '500': '#575a5e',
          '700': '#313335',
          '900': '#1d1e20',
        },
        red: {
          '100': '#ffd9d9',
          '200': '#ffb3b3',
          '300': '#ff8e8e',
          '400': '#ff6868',
          '500': '#FF4242',
          '600': '#D91128',
          '700': '#B4000F',
          '800': '#8F0000',
          '900': '#6D0000',
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
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '1/3': '33%',
        '2/3': '66%'
      },
      height: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '1/3': '33%',
        '2/3': '66%',
        'h-60': '15rem',
        'card': '10rem'
      },
      minHeight: {
        '100': '100px',
        '3/4': '75vh', 
      },
      maxHeight: {
        '1/2': '50%'
      },
      spacing: {
        nav: '80px',
      },
      boxShadow: {
        card: '2px 2px 2px 1px rgba(67,68,69,0.2)'
      }
    },
  },
  variants: {},
  plugins: [require("tailwindcss-debug-screens")],
}
