
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [conversationQueue, setConversationQueue] = useState([]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { sender: "stylist", text: "Hi! I'm Daisy, your AI stylist. What are we dressing for today?" }
      ]);
    }
  }, []);

  const sendMessage = async (userMessage) => {
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage,
          threadId,
          conversationQueue,
        }),
      });

      const data = await res.json();
      const stylistMessage = data.onboarding
        ? { sender: 'stylist', text: data.message }
        : { sender: 'stylist', text: '', moodboard: data.moodboard };

      setMessages((prevMessages) => [...prevMessages, stylistMessage]);
      setThreadId(data.threadId);
      setConversationQueue(data.conversationQueue || []);
    } catch (err) {
      console.error('❌ Error:', err);
      setMessages([
        ...newMessages,
        { sender: 'stylist', text: 'Hmm... something went wrong! Try again later.' }
      ]);
    }
  };

  useEffect(() => {
    if (conversationQueue.length > 0) {
      const timeoutId = setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { sender: 'stylist', text: conversationQueue[0] }]);
        setConversationQueue((prevQueue) => prevQueue.slice(1));
      }, 800);

      return () => clearTimeout(timeoutId);
    }
  }, [conversationQueue]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-violet-50">
      <header className="w-full bg-white/50 backdrop-blur-sm border-b border-neutral-100 fixed top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <span className="text-3xl">✨</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mx-2">Daisy</h1>
            <span className="text-3xl">✨</span>
          </div>
        </div>
      </header>
      
      <main className="pt-24 pb-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bold text-5xl bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent mb-6">
                slay your style bestie 💅
              </h2>
              <p className="text-neutral-600 text-lg max-w-lg mx-auto">
                spill the tea on your vibe & let's make you look iconic fr fr
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <img src="https://i.imgur.com/xqQCkOF.jpg" alt="Bella Hadid" className="w-16 h-16 rounded-full object-cover border-2 border-violet-200" />
                <img src="https://i.imgur.com/XPjxvVk.jpg" alt="Zendaya" className="w-16 h-16 rounded-full object-cover border-2 border-pink-200" />
                <img src="https://i.imgur.com/q8PhQ6n.jpg" alt="Hailey Bieber" className="w-16 h-16 rounded-full object-cover border-2 border-violet-200" />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)] p-6">
              <ChatWindow messages={messages} />
              <ChatInput onSend={sendMessage} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-100 py-8 mt-auto">
        <div className="max-w-screen-xl mx-auto px-4 text-center text-neutral-600">
          <p>© {new Date().getFullYear()} Style AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
