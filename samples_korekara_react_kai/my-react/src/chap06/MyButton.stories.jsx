import { action } from 'storybook/actions';
import { userEvent, within, expect, fn } from 'storybook/test';
import MyButton from './MyButton';

export default {
  title: 'MyApp/MyButton',
  component: MyButton,
  // args: {
  //   label: 'Push!!',
  //   // onClick: action('CLICK'),
  // },

  // argTypesプロパティだけで型を宣言
  argTypes: {
    primary: {
      type: 'boolean',
      description: 'Primaryカラーを有効にするか',
      table: { type: { summary: 'boolean' } },
    },
    backgroundColor: {
      type: 'string',
      description: '背景色',
      control: {
        type: 'color',
        presetColors: ['#ff0000', '#00ff00', '#0000ff']
      },
      table: { type: { summary: 'string' } },
    },
    size: {
      type: 'enum',
      options: ['small', 'medium', 'large'],
      // control: { type: 'radio' },
      description: 'ボタンの大きさ',
      table: { type: { summary: 'enum' } },
    },
    label: {
      type: 'string',
      description: 'ボタンのキャプション',
      table: { type: { summary: 'string' } },
    },
    onClick: {
      type: 'function',
      description: 'clickハンドラー',
    },
  },

  // parameters: {
  //   backgrounds: {
  //     options: {
  //       ghostwhite: { name: 'Ghostwhite', value: '#f8f8ff' },
  //       aquamarine: { name: 'Aquamarine', value: '#7fffd4' },
  //       coral: { name: 'Coral', value: '#ff7f50' },
  //     }
  //   },
  //   layout: 'centered',
  // },

  // decorators: [
  //   Story => (
  //     <div style={{
  //       height: 150,
  //       display: 'flex',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       backgroundColor: '#ccc',
  //     }}>
  //       <Story />
  //     </div>
  //   ),
  // ]

  // parameters: {
  //   layout: 'centered',
  // },

  // tags: ['autodocs'],
};

export const Index = {
  // render: () => <MyButton primary size="medium" label="ボタン"
  //   onClick={() => console.log('Hello, Storybook!!')} />

  // render: args => <MyButton {...args} />,
  args: {
    primary: true,
    size: 'medium',
    label: 'ボタン',
    // onClick: () => console.log('Hello, Storybook!!')
    onClick: fn()
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
  // parameters: {
  //   backgrounds: {
  //     options: {
  //       ghostwhite: { name: 'Ghostwhite', value: '#f8f8ff' },
  //       aquamarine: { name: 'Aquamarine', value: '#7fffd4' },
  //       coral: { name: 'Coral', value: '#ff7f50' },
  //     }
  //   },
  //   layout: 'centered',
  // },
};

export const White = {
  // render: () => <MyButton size="small" label="ボタン"
  //   backgroundColor="#fff" />

  args: {
    size: 'small',
    label: 'ボタン',
    backgroundColor: '#fff',
    // onClick: action('CLICK'),
    onClick: e => {
      console.log('Hello, Storybook');
      action('CLICK')(e, new Date());
    },
  }
};

export const Yellow = {
  args: {
    ...White.args,
    backgroundColor: 'lightyellow'
  }
};