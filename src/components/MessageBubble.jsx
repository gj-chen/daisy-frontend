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
      <div className={`rounded-2xl px-4 py-3 max-w-[70%] text-sm ${isUser ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white shadow-sm border border-gray-100 text-gray-800'}`}>
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
