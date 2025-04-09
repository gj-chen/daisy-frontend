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
  const [feedbackState, setFeedbackState] = useState({}); // url -> like/dislike
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const FEEDBACK_THRESHOLD = 3;

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { role: 'user', text }]);

    const res = await fetch('http://localhost:5000/chat', {
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
      setFeedbackState({});
      setLikeCount(0);
      setDislikeCount(0);
    }
  };

  const handleFinalMoodboard = async (selected, includeGuide) => {
    const res = await fetch('http://localhost:5000/final-moodboard', {
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
    setFeedbackState((prev) => {
      const prevType = prev[imageUrl];
      const updated = { ...prev, [imageUrl]: prev[imageUrl] === type ? null : type };

      // Update counters
      const newLikes = Object.values(updated).filter(v => v === 'like').length;
      const newDislikes = Object.values(updated).filter(v => v === 'dislike').length;
      setLikeCount(newLikes);
      setDislikeCount(newDislikes);

      // Auto-refine after threshold
      if (newDislikes >= FEEDBACK_THRESHOLD) {
        setMessages(prev => [...prev, { role: 'daisy', text: "Sounds like we need a shift — let me rethink the vibe." }]);
        sendMessage("Refine this direction based on my dislikes");
      }

      return updated;
    });
  };

  return (
    <div className="flex flex-row h-[85vh] border border-gray-200 rounded-xl shadow overflow-hidden">
      <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
        <div className="flex-1 overflow-y-auto p-6">
          <ChatWindow messages={messages} />
        </div>
        <div className="border-t border-gray-100 p-4">
          <ChatInput sendMessage={sendMessage} />
        </div>
      </div>

      <div className="w-1/2 bg-gray-50 overflow-y-auto p-4">
        <MoodboardCanvas
          imageUrls={imageUrls}
          onSendMessage={sendMessage}
          onGenerateMoodboard={handleFinalMoodboard}
          onFeedback={handleImageFeedback}
          feedbackState={feedbackState}
        />
      </div>
    </div>
  );
};

export default ChatPage;