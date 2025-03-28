import React from 'react';

export default function MessageBubble({ sender, message }) {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`rounded-xl px-4 py-2 max-w-[70%] text-sm ${isUser ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
        {message}
      </div>
    </div>
  );
}
