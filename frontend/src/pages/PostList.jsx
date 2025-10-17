import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/postsSlice';
import { Link } from 'react-router-dom';

export default function PostList(){
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);

  useEffect(()=> {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(p => (
        <div key={p.id}>
          <h3><Link to={`/posts/${p.id}`}>{p.title}</Link></h3>
          <p>By {p.author?.username} • {new Date(p.created_at).toLocaleString()}</p>
          <p>Likes: {p.likes_count} • You liked? {p.liked_by_user ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
  );
}
