import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      await login(email, password);
      nav('/');
    }catch(err){ alert('Login failed'); }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="input" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" className="input" />
      <button className="btn mt-3">Login</button>
    </form>
  );
}
