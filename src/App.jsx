
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
    <div className="min-h-screen bg-black">
      <header className="w-full border-b border-white/10 fixed top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-8 py-6">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-['Bodoni_Moda'] tracking-[0.2em] text-white">DAISY</h1>
          </div>
        </div>
      </header>
      
      <main className="pt-32 pb-16">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-['Bodoni_Moda'] text-7xl font-normal text-white mb-8 tracking-tight leading-none">
                Style
                <br />
                Redefined
              </h2>
              <p className="text-neutral-400 text-sm max-w-lg mx-auto font-['Roboto_Mono'] tracking-wide uppercase">
                Your personal fashion curator, delivering bespoke style guidance
              </p>
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
