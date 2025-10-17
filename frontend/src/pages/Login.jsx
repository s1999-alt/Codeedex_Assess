import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({username:'', password:''});
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      nav('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <input placeholder="username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/>
      <input placeholder="password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}
