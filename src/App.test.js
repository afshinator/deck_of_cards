import { render, screen } from '@testing-library/react';
import App from './App';

test('renders link to Afshins site', () => {
  render(<App />);
  const linkElement = screen.getByText(/Afshin/i);
  expect(linkElement).toBeInTheDocument();
});
