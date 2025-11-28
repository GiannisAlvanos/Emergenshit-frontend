import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ToiletDetails from './pages/ToiletDetails';
import AddToilet from './pages/AddToilet';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';

function PrivateRoute({children}) {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
}

export default function App(){
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/toilet/:id" element={<ToiletDetails />} />
          <Route path="/add" element={<PrivateRoute><AddToilet/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </>
  )
}
