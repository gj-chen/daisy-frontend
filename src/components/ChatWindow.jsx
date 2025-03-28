import React from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages }) {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-[400px] px-2 py-4 border rounded-lg bg-white shadow-inner">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} sender={msg.sender} message={msg.text} />
      ))}
    </div>
  );
}
