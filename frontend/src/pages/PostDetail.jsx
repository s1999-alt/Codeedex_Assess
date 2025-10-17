import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get(`/posts/${id}/`).then((r) => setPost(r.data));
    API.get(`/posts/${id}/comments/`).then((r) => setComments(r.data));
  }, [id]);

  const addComment = async () => {
    try {
      await API.post(`/posts/${id}/comments/`, { message: msg });
      const r = await API.get(`/posts/${id}/comments/`);
      setComments(r.data);
      setMsg('');
    } catch (err) {
      alert('Comment failed');
    }
  };

  const like = async () => {
    try {
      await API.post(`/posts/${id}/like/`);
      const r = await API.get(`/posts/${id}/`);
      setPost(r.data);
    } catch (err) {
      alert('Like failed');
    }
  };

  const unlike = async () => {
    try {
      await API.post(`/posts/${id}/unlike/`);
      const r = await API.get(`/posts/${id}/`);
      setPost(r.data);
    } catch (err) {
      alert('Unlike failed');
    }
  };

  if (!post) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
   
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
        <p className="text-gray-600 mb-6">{post.content}</p>

        <div className="text-sm text-gray-500 mb-6">
          By{' '}
          <span className="font-medium text-gray-700">
            {post.author?.username || 'Anonymous'}
          </span>{' '}
          • {new Date(post.created_at).toLocaleString()}
        </div>

        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={post.liked_by_user ? unlike : like}
            className={`px-5 py-2 rounded-xl font-medium transition-all ${
              post.liked_by_user
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {post.liked_by_user ? 'Unlike ❤️' : 'Like 👍'}
          </button>
          <span className="text-gray-600">Likes: {post.likes_count}</span>
        </div>

        <hr className="my-6 border-gray-200" />

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h3>

        <div className="space-y-4 mb-6">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4"
              >
                <p className="text-gray-800">
                  <span className="font-semibold text-blue-700">{c.user.username}</span>:{' '}
                  {c.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
          />
          <button
            onClick={addComment}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
}
