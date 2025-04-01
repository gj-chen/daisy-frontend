import React, { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log('📤 Sending message:', input);
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tell me what you're looking for..."
        className="w-full px-4 py-3 rounded-full bg-[#E9E9EB] border-none placeholder-neutral-500 focus:ring-2 focus:ring-[#007AFF] transition-all text-base"
      />
      {/* Phase 1: Placeholder for suggestions (can be dynamic later) */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setInput("I'm dressing for a summer wedding.");
          }}
          className="text-xs px-3 py-1.5 bg-white/50 border border-gray-200 rounded-full hover:bg-white hover:border-indigo-200 transition-colors"
        >
          ✨ Summer wedding szn
        </button>
        <button
          type="button"
          onClick={() => {
            setInput("I want that clean girl aesthetic");
          }}
          className="text-xs px-3 py-1.5 bg-white/50 border border-gray-200 rounded-full hover:bg-white hover:border-pink-200 transition-colors"
        >
          🤍 Clean girl aesthetic
        </button>
        <button
          type="button"
          onClick={() => {
            setInput("Help me dress like Bella Hadid off duty");
          }}
          className="text-xs px-3 py-1.5 bg-white/50 border border-gray-200 rounded-full hover:bg-white hover:border-violet-200 transition-colors"
        >
          🔥 Model off duty
        </button>
      </div>
    </form>
  );
}