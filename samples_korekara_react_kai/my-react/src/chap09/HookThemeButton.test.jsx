import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HookThemeButton from '../chap07/HookThemeButton';
import MyThemeProvider from '../chap07/MyThemeProvider';

test('HookThemeButton Test', async () => {
  const ev = userEvent.setup();
  render(<HookThemeButton />, { wrapper: MyThemeProvider });
  const btn = screen.getByRole('button');
  ev.click(btn);
  await waitFor(() => expect(btn).toHaveTextContent('dark'));
});