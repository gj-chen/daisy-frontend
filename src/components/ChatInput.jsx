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
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your stylist..."
        className="chat-input"
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
          Summer wedding
        </button>
        <button
          type="button"
          onClick={() => {
            setInput("I like Hailey Bieber's style.");
          }}
          className="text-xs px-3 py-1.5 bg-white/50 border border-gray-200 rounded-full hover:bg-white hover:border-indigo-200 transition-colors"
        >
          Hailey Bieber inspo
        </button>
      </div>
    </form>
  );
}