import React from 'react';

const ChatWindow = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
            msg.role === 'user'
              ? 'bg-[#F0EDE9] ml-auto text-right'
              : 'bg-[#F5F5F5] text-left'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
