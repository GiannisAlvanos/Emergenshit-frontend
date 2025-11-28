import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-md mx-auto mt-10 p-4 border rounded"
    >
      <h1 className="text-2xl mb-4 font-bold">Register</h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
