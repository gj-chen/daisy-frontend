import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'stylist', text: 'Hi! I’m Daisy, your AI stylist. What are we dressing for today?' },
  ]);

  const [conversationState, setConversationState] = useState({
    bodyType: null,
    vibe: null,
    celebs: null,
    budget: null,
    climate: null,
    occasion: null
  });
  
  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);

    console.log('📤 Sending message:', {
      message: userMessage,
      state: conversationState
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stylist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          state: conversationState
        }),
      });

      const data = await res.json();
      console.log('🧠 AI stylist response:', data.reply);

      setMessages([...newMessages, { sender: 'stylist', text: data.reply }]);
    } catch (err) {
      console.error('❌ Error fetching stylist response:', err);
      setMessages([...newMessages, { sender: 'stylist', text: 'Hmm... something went wrong! Try again later.' }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">
        <ChatWindow messages={messages} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}

export default App;
