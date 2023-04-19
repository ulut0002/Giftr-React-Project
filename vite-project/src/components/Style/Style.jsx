import { extendTheme } from '@chakra-ui/react';

const fontSizes = {
  sm: {
    h1: '2.488rem',
    h2: '2.074rem',
    h3: '1.728rem',
    h4: '1.44rem',
    h5: '1.2rem',
    h6: '1rem',
    small: '0.833rem',
  },
  md: {
    h1: '3.052rem',
    h2: '2.441rem',
    h3: '1.953rem',
    h4: '1.563rem',
    h5: '1.25rem',
    h6: '1rem',
    small: '0.8rem',
  },
};

const breakpoints = {
  sm: '30rem',
  md: '45rem',
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
const secondary = { light: 'gray.50', dark: 'gray.700', highlight: 'purple' };
const alert = { red: 'red.500' };

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

      '.welcome': {
        fontSize: { sm: fontSizes.sm.h1, md: fontSizes.md.h1 },
        color: secondary.highlight,
        fontWeight: 'bold',
      },

      '.welcome-subtitle': {
        fontSize: { sm: fontSizes.sm.h3, md: fontSizes.md.h3 },
      },

      '.add-btn': { marginRight: '1rem' },

      '.welcome-container': {
        marginTop: '2rem',
        paddingTop: '2rem',
      },

      h3: {
        color: primary.dark,
      },

      '.person-id': {
        listStyleType: 'none',
        padding: '1rem',
        bg: 'gray.50',
      },

      '.people-name': {
        fontSize: '1.5rem',
        padding: '0rem',
      },
      '.people-dob': {
        padding: '0rem',
      },

      '.gift-name': {
        fontSize: '1.5rem',
        padding: '0rem',
      },
      '.gift-url': {
        padding: '0rem',
      },
      '.gift-store': {
        padding: '0rem',
      },

      '.List': {
        listStyleType: 'none',
        margin: '0',
        marginTop: '1rem',
        padding: '0rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      },

      '.title': {
        border: '2px solid black',
        bg: 'gray.20',
        borderRadius: 'xl',
        padding: '2rem',
      },

      '.list-title': {
        fontSize: { sm: fontSizes.sm.h2, md: fontSizes.md.h2 },
        fontWeight: 'bold',
      },

      '.new-entry-header': {
        fontSize: { sm: fontSizes.sm.h3, md: fontSizes.md.h3 },
      },

      '.empty-list-warning': {
        fontSize: { sm: fontSizes.sm.h5, md: fontSizes.md.h5 },
        fontWeight: 'bold',
        marginTop: '2rem',
      },

      '.button-group': {
        marginTop: '1rem',
      },
      //responsive only
      '.container': {
        minWidth: { sm: '100%', md: '50%' },
        padding: '0rem',
        margin: '0',
      },

      '.sub-container': {
        margin: '0',
        marginTop: '2rem',
      },

      '.error-text': {
        paddingTop: '2rem',
        textAlign: 'center',
        color: alert.red,
        fontSize: { sm: fontSizes.sm.h5, md: fontSizes.md.h5 },
        fontWeight: 'bold',
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
