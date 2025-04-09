import React, { useState } from 'react';

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setInput('');
    setLoading(true);
    await sendMessage(userInput);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded p-2"
        placeholder="Type your message to Daisy..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;