import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);

  const [conversationState, setConversationState] = useState({
    bodyType: null,
    vibe: null,
    celebs: null,
    budget: null,
    climate: null,
    occasion: null
  });

  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ sender: 'stylist', text: 'Hi! I’m Daisy, your AI stylist. What are we dressing for today?' }]);
    }
  }, []);
  
  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);

    console.log('📤 Sending message:', {
      message: userMessage,
      state: conversationState
    });

    // Filter out Daisy's initial intro message so it's not sent to OpenAI
    const openAIMessages = newMessages.filter(
      m => !(m.sender === 'stylist' && m.text === "Hi! I’m Daisy, your AI stylist. What are we dressing for today?")
    );

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage,
          threadId
        }),
      });

      const data = await res.json();
      console.log('🧠 AI stylist response:', data.reply);

      // If the reply is just a JSON string and moodboard exists, don’t show it as text
      const isValidString = typeof data.reply === 'string';
      const parsedIsOnlyMoodboard = data.moodboard && isValidString && data.reply.trim().startsWith('{');


      console.log("🧵 Final message being pushed:", {
        text: parsedIsOnlyMoodboard ? '' : data.reply,
        moodboard: data.moodboard || null
      });

      setMessages([
        ...newMessages,
        {
          sender: 'stylist',
          text: parsedIsOnlyMoodboard ? '' : data.reply,
          moodboard: data.moodboard || null
        }
      ]);


      setThreadId(data.threadId);
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
