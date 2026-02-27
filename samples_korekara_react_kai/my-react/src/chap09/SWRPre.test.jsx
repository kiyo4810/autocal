import { render, screen } from '@testing-library/react';
import SWRPre from '../chap06/SWRPre';

describe('SWRPre', () => {
  test('fetch関数を伴うテスト', async () => {
    render(<SWRPre />);
    const img = await screen.findByRole('img', {}, { timeout: 3000 });
    expect(img).toHaveAttribute('alt', 'Clouds');
  });
});