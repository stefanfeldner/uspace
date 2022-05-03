import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders loading', () => {
  render(<Home />);
  const loadingElement = screen.getByRole('presentation');
  expect(loadingElement).toBeInTheDocument();
});
