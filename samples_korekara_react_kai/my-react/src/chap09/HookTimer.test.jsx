import { act, render, screen } from '@testing-library/react';
import HookTimer from '../chap07/HookTimer';

describe('HookTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('setInterval', () => {
    const { debug } = render(<HookTimer init={10} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    const counter = screen.getByText(/現在のカウント/);
    debug(counter);
    expect(counter).toHaveTextContent('9');
  });
});