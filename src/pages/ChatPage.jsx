import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import MoodboardCanvas from '../components/MoodboardCanvas';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      role: 'daisy',
      text: "Let’s look at some vibes together. I’ll show you a few directions and you tell me what feels like you."
    }
  ]);
  const [imageUrls, setImageUrls] = useState([]);

  return (
    <div className="flex flex-row h-[85vh] border border-gray-200 rounded-xl shadow overflow-hidden">
      {/* Chat Pane */}
      <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
        <div className="flex-1 overflow-y-auto p-6">
          <ChatWindow messages={messages} />
        </div>
        <div className="border-t border-gray-100 p-4">
          <ChatInput setMessages={setMessages} setImageUrls={setImageUrls} />
        </div>
      </div>

      {/* Moodboard Pane */}
      <div className="w-1/2 flex flex-col bg-[#FCFBFA]">
        <div className="flex-1 overflow-y-auto p-6">
          <MoodboardCanvas
            imageUrls={imageUrls}
            onFeedback={(feedbackText) => {
              // Send silent message to backend
              fetch('https://your-backend-url/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: feedbackText })
              });
            }}
            onGenerateMoodboard={async (selectedUrls, includeGuide) => {
              try {
                const res = await fetch('https://d9247149-d0ef-4e4b-b2ec-ae1b7b65a41a-00-2tah3vnbw8aih.spock.replit.dev/final-moodboard', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    imageUrls: selectedUrls,
                    includeStylingGuide: includeGuide
                  })
                });
                const data = await res.json();
                setMessages((prev) => [...prev, { role: 'assistant', text: data.response }]);
              } catch (e) {
                setMessages((prev) => [...prev, { role: 'assistant', text: '[Error generating moodboard]' }]);
              }
            }}
          />

        </div>
      </div>
    </div>
  );
};

export default ChatPage;
