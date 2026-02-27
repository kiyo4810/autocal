import { render, screen } from '@testing-library/react';
import App from '../App';

test('Vite + React Heading', () => {
  render(<App />);
  const headText = screen.getByText(/Vite \+ React/i);
  // const headText = screen.getByRole('heading', { name: /Vite \+ React/i });
  expect(headText).toBeInTheDocument();
});

// test('Vite + React Heading', () => {
//   const { debug, baseElement } = render(<App />);
//   debug(baseElement);
//   const headText = screen.getByText(/Vite \+ React/i);
//   expect(headText).toBeInTheDocument();
// });

// test('Vite + React Heading', () => {
//   const sec = document.createElement('section');
//   const { debug, baseElement } = render(<App />, {
//     container: document.body.appendChild(sec)
//   })
//   debug(baseElement);
//   const headText = screen.getByText(/Vite \+ React/i);
//   expect(headText).toBeInTheDocument();
// });