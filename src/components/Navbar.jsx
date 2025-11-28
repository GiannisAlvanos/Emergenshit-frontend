import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        EmergenSh!t
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/">Home</Link>

        {user && (
          <>
            <Link to="/add">Add Toilet</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
          </>
        )}

        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
