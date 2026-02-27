/** @type { import('@storybook/react-vite').Preview } */
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // layout: 'centered',
    // backgrounds: {
    //   options: {
    //     ghostwhite: { name: 'Ghostwhite', value: '#f8f8ff' },
    //     aquamarine: { name: 'Aquamarine', value: '#7fffd4' },
    //     coral: { name: 'Coral', value: '#ff7f50' },
    //   }
    // },

    // viewport: {
    //   options: INITIAL_VIEWPORTS
    // },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  // initialGlobals: {
  //   viewport: { value: 'iphonex', isRotated: false },
  // },
};

export default preview;