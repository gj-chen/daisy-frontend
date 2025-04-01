// MessageBubble.jsx
import React from 'react';

export default function MessageBubble({ sender, message, moodboard, onViewMoodboard }) {
  const isUser = sender === 'user';
  
  console.log("🧩 FINAL BUBBLE:", {
    isUser,
    message,
    moodboard
  });

  console.log("🧩 MessageBubble props:", { sender, message, moodboard });
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div 
        className={`rounded-[20px] px-4 py-3 max-w-[70%] ${
          isUser 
            ? 'bg-[#007AFF] text-white rounded-br-md' 
            : 'bg-[#E9E9EB] text-black rounded-bl-md'
        }`}
      >
        {(!moodboard || typeof message !== 'string' || !message.trim().startsWith('{')) && (
          <p>{message}</p>
        )}

        {!isUser && moodboard && (
          <>
            <p className="text-xs text-gray-400">🟢 Moodboard detected</p>
            <button
              className="mt-2 text-blue-600 hover:underline text-xs"
              onClick={() => onViewMoodboard(moodboard)}
            >
              View Moodboard
            </button>
          </>
        )}

      </div>
    </div>
  );
}
