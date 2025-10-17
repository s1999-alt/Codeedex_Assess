import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      API.get(`/posts/${id}/`).then((res) => setForm(res.data));
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/posts/${id}/`, form);
        alert('Post updated');
      } else {
        await API.post('/posts/', form);
        alert('Post created');
      }
      navigate('/');
    } catch {
      alert('Failed to save post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {id ? 'Edit Post' : 'Create Post'}
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Content
            </label>
            <textarea
              placeholder="Enter post content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all"
          >
            {id ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
