import React, { useEffect, useState, useContext } from "react";
import AdminAPI from "../api/admin";
import { AuthContext } from "../contexts/AuthContext";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    loadPending();
  }, []);

  async function loadPending() {
    const res = await AdminAPI.getPending();
    setPending(res.data.data || []);
  }

  async function approve(id) {
    await AdminAPI.approve(id);
    loadPending();
  }

  async function reject(id) {
    await AdminAPI.reject(id);
    loadPending();
  }

  if (!user || user.role !== "admin") {
    return <p className="text-center mt-10 text-red-500">Access denied</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Pending Toilets</h1>

      {pending.length === 0 && <p>No pending toilets</p>}

      {pending.map((t) => (
        <div key={t.toiletId} className="border p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold">{t.name}</h2>
          <p>{t.description}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => approve(t.toiletId)}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(t.toiletId)}
              className="bg-red-600 text-white px-3 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
