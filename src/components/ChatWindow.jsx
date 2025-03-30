// ChatWindow.jsx
import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import MoodboardModal from './MoodboardModal';

export default function ChatWindow({ messages }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMoodboard, setSelectedMoodboard] = useState(null);
  console.log("💬 All messages:", messages); // ✅ SAFE now

  const handleViewMoodboard = (moodboard) => {
    console.log('👗 Opening moodboard modal with:', moodboard);
    setSelectedMoodboard(moodboard);
    setModalOpen(true);
  };

  return (
    <div className='relative'>
      <div className='flex flex-col gap-2 overflow-y-auto h-[400px] px-2 py-4 border rounded-lg bg-white shadow-inner'>
        {messages.map((msg, idx) => {
          console.log('🧪 Rendering message:', msg);
          return (
            <MessageBubble
              key={idx}
              sender={msg.sender}
              message={msg.text}
              moodboard={msg.moodboard}
              onViewMoodboard={handleViewMoodboard}
            />
          );
        })}
      </div>

      <MoodboardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageUrls={selectedMoodboard?.imageUrls || []}
        rationale={selectedMoodboard?.rationale || {}}
      />
    </div>
  );
}
