import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/myposts/')
      .then((res) => setPosts(res.data))
      .catch(() => alert('Failed to load your posts.'));
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await API.delete(`/posts/${id}/`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Posts</h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-3">{post.content}</p>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(post.created_at).toLocaleString()}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/edit/${post.id}`)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
