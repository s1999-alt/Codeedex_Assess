import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost(){
  const [form, setForm] = useState({title:'', content:''});
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const r = await API.post('/posts/', form);
      nav(`/posts/${r.data.id}`);
    } catch (err) {
      alert('Create failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
      <textarea placeholder="Content" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} />
      <button>Create</button>
    </form>
  );
}
