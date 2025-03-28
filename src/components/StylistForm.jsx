import React from 'react';

import { useState } from 'react';

export default function StylistForm({ onResponse }) {
  const [bodyType, setBodyType] = useState('');
  const [vibe, setVibe] = useState('');
  const [celebs, setCelebs] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onResponse("Styling in progress...");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stylist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bodyType, vibe, celebs, budget }),
      });

      const data = await res.json();
      onResponse(data.reply);
    } catch (err) {
      console.error("❌ Frontend fetch error:", err);
      onResponse("Something went wrong talking to the stylist.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input className="w-full border p-2 rounded" placeholder="Body type" value={bodyType} onChange={e => setBodyType(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Vibe or Occasion" value={vibe} onChange={e => setVibe(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Celebs you like" value={celebs} onChange={e => setCelebs(e.target.value)} />
      <input className="w-full border p-2 rounded" placeholder="Budget (optional)" value={budget} onChange={e => setBudget(e.target.value)} />
      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-all" type="submit">
        Style Me
      </button>
    </form>
  );
}
