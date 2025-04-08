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
    <div className="flex flex-row min-h-[75vh] border border-gray-200 rounded-xl shadow overflow-hidden">
      {/* Left Pane: Chat */}
      <div className="w-1/2 border-r border-gray-200 flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto p-6">
          <ChatWindow messages={messages} />
        </div>
        <div className="border-t border-gray-100 p-4">
          <ChatInput setMessages={setMessages} setImageUrls={setImageUrls} />
        </div>
      </div>

      {/* Right Pane: Moodboard */}
      <div className="w-1/2 p-6 overflow-y-auto bg-[#FCFBFA]">
        <MoodboardCanvas imageUrls={imageUrls} onFeedback={(feedbackText) => {
          setMessages(prev => [...prev, { role: 'user', text: feedbackText }]);
        }} />
      </div>
    </div>
  );
};

export default ChatPage;
