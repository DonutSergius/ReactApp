import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Article from './Article';

test('renders article title', () => {
  const articleTitle = "Test Article Title";
  render(<Article articleTitle={articleTitle} />);
  const titleElement = screen.getByText(/Test Article Title/i);
  expect(titleElement).toBeInTheDocument();
});