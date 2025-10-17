import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({username:'', email:'', password1:'', password2:''});
  const dispatch = useDispatch();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(form)).unwrap();
      nav('/login');
    } catch (err) {
      alert('Register failed: ' + err.message);
    }
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password1}
        onChange={(e) => setForm({ ...form, password1: e.target.value })}
      />
      <input
        placeholder="Confirm Password"
        type="password"
        value={form.password2}
        onChange={(e) => setForm({ ...form, password2: e.target.value })}
      />
      <button>Register</button>
    </form>
  );
}
