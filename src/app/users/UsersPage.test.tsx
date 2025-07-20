import { render, screen, waitFor } from '@testing-library/react';
import UsersPage from './page';

// Mocking global fetch
global.fetch = jest.fn();

const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

describe('UsersPage', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUsers),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders page heading and fetched users', async () => {
    render(await UsersPage());

    expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    });
  });

  it('calls fetch with correct URL and options', async () => {
    render(await UsersPage());

    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users',
      { next: { revalidate: 60 } }
    );
  });
});
