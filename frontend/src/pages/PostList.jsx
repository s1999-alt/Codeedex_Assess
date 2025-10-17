import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/postsSlice';
import { Link } from 'react-router-dom';

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Latest Posts
        </h2>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No posts yet.</p>
          ) : (
            posts.map((p) => (
              <div
                key={p.id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link
                    to={`/posts/${p.id}`}
                    className="underline text-blue-600 transition-all"
                  >
                    {p.title}
                  </Link>
                </h3>

                <p className="text-sm text-gray-500 mb-3">
                  By <span className="font-medium text-gray-700">{p.author?.username || 'Anonymous'}</span> •{' '}
                  {new Date(p.created_at).toLocaleString()}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>👍 {p.likes_count} Likes</span>
                  <span>
                    {p.liked_by_user ? (
                      <span className="text-blue-600 font-medium">You liked this</span>
                    ) : (
                      <span className="text-gray-500">Not liked yet</span>
                    )}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
