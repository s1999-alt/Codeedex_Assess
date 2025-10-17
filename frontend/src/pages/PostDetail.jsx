import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function PostDetail(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(()=> {
    API.get(`/posts/${id}/`).then(r=>setPost(r.data));
    API.get(`/posts/${id}/comments/`).then(r=>setComments(r.data));
  }, [id]);

  const addComment = async () => {
    try {
      await API.post(`/posts/${id}/comments/`, {message: msg});
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

  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>By {post.author?.username} • {new Date(post.created_at).toLocaleString()}</p>
      <p>Likes: {post.likes_count}</p>
      {post.liked_by_user ? <button onClick={unlike}>Unlike</button> : <button onClick={like}>Like</button>}
      <hr/>
      <h3>Comments</h3>
      {comments.map(c => (
        <div key={c.id}>
          <p><b>{c.user.username}</b>: {c.message}</p>
        </div>
      ))}
      <textarea value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}
