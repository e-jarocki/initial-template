import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '@/entities/Post/model';

type PostsState = Post[];

const initialState: PostsState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      return action.payload;
    },
    addPost(state) {
      const newPost: Post = {
        id: Date.now(),
        title: 'Lorem Ipsum',
        body: 'Dolor sit amet, consectetur adipiscing elit.',
      };
      state.push(newPost);
    },
    removePost(state) {
      state.pop();
    },
  },
});

export const { setPosts, addPost, removePost } = postsSlice.actions;
export default postsSlice.reducer;
