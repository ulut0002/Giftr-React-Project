import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '30rem',
  md: '45rem',
  base: '0',
};

// const theme = {
//   styles: {
//     global: {
//       'html, body': {
//         color: 'blue.600',
//         lineHeight: 'tall',
//       },
//       a: {
//         color: 'teal.500',
//       },
//     },
//   },
// };
const primary = { light: 'gray.10', dark: 'gray.700' };
const secondary = { light: 'gray.50', dark: 'gray.700' };

const theme = {
  breakpoints: breakpoints,
  styles: {
    global: (props) => ({
      'html, body': {
        fontSize: 'sm',
        color: {
          primary: 'black',
          secondary: 'blue',
          alert: 'red',
        },
        bg: primary.light,
        lineHeight: 'tall',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
      },
      //color
      nav: {
        bg: primary.light,
        color: primary.dark,
        w: '100%',
      },

      h3: {
        color: primary.dark,
      },

      '.person-id': {
        listStyleType: 'none',
        padding: '0rem',
      },

      '.people-name': {
        fontSize: '1.5rem',
        padding: '0rem',
      },
      '.people-dob': {
        marginBottom: '2rem',
        padding: '0rem',
      },

      '.List': {
        bg: 'gray.50',
        listStyleType: 'none',
        marginTop: '1rem',
        padding: '0rem',
      },

      '.title': {
        border: '2px solid black',
        bg: 'gray.20',
        borderRadius: 'xl',
      },

      //responsive only
      '.container': {
        minWidth: { sm: '100%', md: '50%' },
        padding: '0rem',
      },

      footer: {
        bg: primary.dark,
        color: primary.light,
      },
    }),
  },
};

// 3. Extend the theme
const theme2 = extendTheme(theme);

// 4. Now you can use the custom breakpoints
//   function Example() {
//     return <Box width={{ base: '100%', sm: '50%', md: '25%' }} />;
//   }

export default theme2;
