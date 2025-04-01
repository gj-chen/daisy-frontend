import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { sender: 'stylist', text: 'Hi! I’m Daisy, your AI stylist. What are we dressing for today?' }
      ]);
    }
  }, []);

  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);

    console.log('📤 Sending message:', { userMessage, threadId });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, threadId }),
      });

      const data = await res.json();
      console.log('🧠 Backend response:', data);

      const stylistMessage = data.onboarding
        ? { sender: 'stylist', text: data.message }
        : {
            sender: 'stylist',
            text: '',
            moodboard: data.moodboard,
          };

      setMessages([...newMessages, stylistMessage]);
      setThreadId(data.threadId);
    } catch (err) {
      console.error('❌ Error fetching stylist response:', err);
      setMessages([
        ...newMessages,
        { sender: 'stylist', text: 'Hmm... something went wrong! Try again later.' }
      ]);
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
