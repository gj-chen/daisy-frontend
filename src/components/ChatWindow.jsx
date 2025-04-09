import React from 'react';
import '../styles/scrollbar-hide.css';

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window scrollbar-hide overflow-y-auto space-y-4 px-4">
      {messages.map((msg, i) => (
        <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-gray-400 mb-1">
            {msg.role === 'user' ? 'Gloria' : 'Daisy'}
          </span>
          <div
            className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#F0EDE9] text-right'
                : 'bg-[#F5F5F5] text-left'
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
