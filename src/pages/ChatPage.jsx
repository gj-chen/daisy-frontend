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

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);

    const res = await fetch('https://d9247149-d0ef-4e4b-b2ec-ae1b7b65a41a-00-2tah3vnbw8aih.spock.replit.dev/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, userId: 'demo-user' }),
    });

    const data = await res.json();

    if (data.messages) {
      setMessages((prev) => [...prev, ...data.messages]);
    }

    if (data.moodboard?.images) {
      setImageUrls(data.moodboard.images);
    }
  };

  const handleFinalMoodboard = async (selected, includeGuide) => {
    const res = await fetch('https://d9247149-d0ef-4e4b-b2ec-ae1b7b65a41a-00-2tah3vnbw8aih.spock.replit.dev/final-moodboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrls: selected,
        includeStylingGuide: includeGuide
      })
    });

    const data = await res.json();
    if (data.response) {
      setMessages((prev) => [...prev, { role: 'daisy', text: data.response }]);
    }
  };

  const handleImageFeedback = (imageUrl, type) => {
    console.log(`Feedback: ${type} on ${imageUrl}`);
  };

  return (
    <div className="flex flex-row h-[85vh] border border-gray-200 rounded-xl shadow overflow-hidden">
      {/* Chat Pane */}
      <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
        <div className="flex-1 overflow-y-auto p-6">
          <ChatWindow messages={messages} />
        </div>
        <div className="border-t border-gray-100 p-4">
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>

      {/* Moodboard Pane */}
      <div className="w-1/2 bg-gray-50 overflow-y-auto p-4">
        <MoodboardCanvas
          imageUrls={imageUrls}
          onSendMessage={sendMessage}
          onGenerateMoodboard={handleFinalMoodboard}
          onFeedback={handleImageFeedback}
        />
      </div>
    </div>
  );
};

export default ChatPage;
