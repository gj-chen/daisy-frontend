import React, { useState, useEffect, useRef } from 'react';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import MoodboardCanvas from '../components/MoodboardCanvas';
import FinalMoodboardModal from '../components/FinalMoodboardModal';

const ChatPage = () => {
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: 'daisy',
      text: "Let’s look at some vibes together. I’ll show you a few directions and you tell me what feels like you."
    }
  ]);
  const [imageUrls, setImageUrls] = useState([]);
  const [feedbackState, setFeedbackState] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [finalData, setFinalData] = useState({ summary: '', rationales: [] });
  const [showModal, setShowModal] = useState(false);
  const [daisyThinking, setDaisyThinking] = useState(false);
  const [toolUsed, setToolUsed] = useState(false);
  const FEEDBACK_THRESHOLD = 3;

  const sendMessage = async (text) => {
    setDaisyThinking(true);
    setToolUsed(false);
    setMessages((prev) => [...prev, { role: 'user', text }]);

    const res = await fetch('https://d9247149-d0ef-4e4b-b2ec-ae1b7b65a41a-00-2tah3vnbw8aih.spock.replit.dev/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, userId: 'demo-user' }),
    });

    const data = await res.json();
    setDaisyThinking(false);

    if (data.messages) {
      setMessages((prev) => [...prev, ...data.messages]);
    }

    if (data.toolUsed) {
      setToolUsed(true);
      setMessages(prev => [...prev, { role: 'system', text: "Daisy is curating your moodboard..." }]);
    }

    if (data.moodboard?.images) {
      setImageUrls(data.moodboard.images);
      setFeedbackState({});
      setLikeCount(0);
      setDislikeCount(0);
    }
  };

  const handleFinalMoodboard = async (selected, includeGuide) => {
    const res = await fetch('https://d9247149-d0ef-4e4b-b2ec-ae1b7b65a41a-00-2tah3vnbw8aih.spock.replit.dev/final-moodboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrls: selected,
        includeStylingGuide: includeGuide,
        userId: 'demo-user'
      })
    });

    const data = await res.json();
    if (data.summary) {
      setFinalData({ summary: data.summary, rationales: data.rationales || [] });
      setShowModal(true);
    }
  };

  const handleImageFeedback = (imageUrl, type) => {
    setFeedbackState((prev) => {
      const prevType = prev[imageUrl];
      const updated = { ...prev, [imageUrl]: prev[imageUrl] === type ? null : type };

      const newLikes = Object.values(updated).filter(v => v === 'like').length;
      const newDislikes = Object.values(updated).filter(v => v === 'dislike').length;
      setLikeCount(newLikes);
      setDislikeCount(newDislikes);

      if (newDislikes >= FEEDBACK_THRESHOLD) {
        setMessages(prev => [...prev, { role: 'daisy', text: "Sounds like we need a shift — let me rethink the vibe." }]);
        sendMessage("Refine this direction based on my dislikes");
      }

      return updated;
    });
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className="flex flex-row h-[85vh] border border-gray-200 rounded-xl shadow overflow-hidden">
        <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
          <div className="flex-1 overflow-y-auto p-6">
            <ChatWindow messages={messages} />
            <div ref={chatEndRef} />
            {daisyThinking && !toolUsed && (
              <div className="text-xs text-gray-400 mt-1 ml-1">Daisy is thinking…</div>
            )}
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

      <FinalMoodboardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        summary={finalData.summary}
        images={imageUrls}
        rationales={finalData.rationales}
      />
    </>
  );
};

export default ChatPage;
