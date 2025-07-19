'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { addPost, removePost, setPosts } from '@/store/slices/postsSlice';

export default function PostsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      dispatch(setPosts(data.slice(0, 10)));
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-300 flex justify-center">
        Redux Store Demo
      </h1>

      <div className="mb-4 space-x-4 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => dispatch(addPost())}
        >
          Add Post
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          onClick={() => dispatch(removePost())}
        >
          Remove Post
        </button>
      </div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded bg-white">
            <p className="font-bold">{post.title}</p>
            <p className="text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
