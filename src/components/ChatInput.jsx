import React, { useState } from 'react';

const ChatInput = ({ setMessages, setImageUrls }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setLoading(true);
    setInput('');

    setMessages(prev => [...prev, { role: 'user', text: userText }]);

    try {
      const res = await fetch('https://d9247149-d0ef-4e4b-b2ec-ae1b7b65a41a-00-2tah3vnbw8aih.spock.replit.dev/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();
      const daisyReply = data.message || '[No response]';

      setMessages(prev => [...prev, { role: 'daisy', text: daisyReply }]);

      if (data.moodboard?.imageUrls?.length > 0) {
        setImageUrls(data.moodboard.imageUrls);
      }
    } catch (err) {
      console.error('Error talking to Daisy:', err);
      setMessages(prev => [...prev, { role: 'daisy', text: '[Something went wrong]' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none"
        placeholder="Let’s talk style. Describe your vibe..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="text-sm px-3 py-2 rounded-xl bg-black text-white hover:bg-gray-900 transition"
      >
        {loading ? 'Thinking…' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
