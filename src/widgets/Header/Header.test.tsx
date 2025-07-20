import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { NAV_ITEMS } from './model';
import { usePathname } from 'next/navigation';

// Mock usePathname to control active route
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  it('renders all nav items', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Header />);
    NAV_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('highlights the active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/users');

    render(<Header />);
    const activeLink = screen.getByText('Users');
    expect(activeLink).toHaveClass('underline');
    expect(activeLink).toHaveClass('text-blue-400');
  });
});
