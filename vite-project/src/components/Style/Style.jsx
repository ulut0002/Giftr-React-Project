import { extendTheme } from '@chakra-ui/react';

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

const theme = {
  breakpoints: breakpoints,
  styles: {
    global: (props) => ({
      'html, body': {
        fontSize: 'sm',
        color: 'blue.200',
        bg: 'gray.200',
        lineHeight: 'tall',
      },
      a: {
        color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
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
