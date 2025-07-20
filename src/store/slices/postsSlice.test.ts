import postsReducer, { setPosts, addPost, removePost } from './postsSlice';
import { Post } from '@/entities/Post/model';

describe('postsSlice', () => {
  const mockPosts: Post[] = [
    { id: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, title: 'Post 2', body: 'Body 2' },
  ];

  it('should return the initial state', () => {
    expect(postsReducer(undefined, { type: '' })).toEqual([]);
  });

  it('should handle setPosts', () => {
    const newState = postsReducer([], setPosts(mockPosts));
    expect(newState).toEqual(mockPosts);
  });

  it('should handle addPost', () => {
    const prevState: Post[] = [...mockPosts];
    const newState = postsReducer(prevState, addPost());

    expect(newState).toHaveLength(3);
    expect(newState[2]).toMatchObject({
      title: 'Lorem Ipsum',
      body: 'Dolor sit amet, consectetur adipiscing elit.',
    });
    expect(typeof newState[2].id).toBe('number');
  });

  it('should handle removePost', () => {
    const prevState: Post[] = [...mockPosts];
    const newState = postsReducer(prevState, removePost());

    expect(newState).toHaveLength(1);
    expect(newState[0]).toEqual(mockPosts[0]);
  });

  it('should do nothing if removePost is called on empty state', () => {
    const newState = postsReducer([], removePost());
    expect(newState).toEqual([]);
  });
});
