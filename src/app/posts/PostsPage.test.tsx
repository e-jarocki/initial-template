import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PostsPage from './page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '@/store/slices/postsSlice';
import { Post } from '@/entities/Post/model';
import { act } from 'react';

// Mock fetch
global.fetch = jest.fn();

const mockFetchedPosts: Post[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: `Fetched Post ${i + 1}`,
  body: `Body ${i + 1}`,
}));

const setup = (preloadedState = { posts: [] }) => {
  return act(() => {
    const store = configureStore({
      reducer: { posts: postsReducer },
      preloadedState,
    });

    return render(
      <Provider store={store}>
        <PostsPage />
      </Provider>
    );
  });
};

describe('PostsPage', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFetchedPosts),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading and buttons', async () => {
    await setup();

    expect(
      screen.getByRole('heading', { name: /redux store demo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add post/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /remove post/i })
    ).toBeInTheDocument();
  });

  it('fetches and sets posts on mount', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText('Fetched Post 1')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(10);
  });

  it('adds a post on Add Post button click', async () => {
    await setup();

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(10);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /add post/i }));
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(11);
    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument();
  });

  it('removes a post on Remove Post button click', async () => {
    await setup();

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(10);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /remove post/i }));
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(9);
  });
});
