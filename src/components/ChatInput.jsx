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
      
      if (!res.ok) throw new Error("Daisy backend returned a non-200 response");
      
      const data = await res.json();

      if (data.messages && Array.isArray(data.messages)) {
        setMessages(prev => [
          ...prev,
          ...data.messages.map(m => ({ role: 'assistant', text: m.text }))
        ]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: '[No reply from Daisy]' }]);
      }

      // ✅ Render the moodboard if image URLs are included
      if (data.moodboard && Array.isArray(data.moodboard.images)){
        setImageUrls(data.moodboard.images);
      }


    } catch (err) {
      console.error('Error talking to Daisy:', err);
      setMessages(prev => [...prev, { role: 'assistant', text: '[Something went wrong]' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <textarea
        className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none resize-none leading-snug min-h-[40px] max-h-[120px] overflow-y-auto"
        placeholder={loading ? "Thinking..." : "Let’s talk style. Describe your vibe..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded-xl text-sm"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
