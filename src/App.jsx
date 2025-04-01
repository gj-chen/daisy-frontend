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
    <div className="min-h-screen bg-[#FAF9F6]">
      <header className="w-full border-b border-neutral-200/50 fixed top-0 z-10 bg-[#FAF9F6]">
        <div className="max-w-screen-xl mx-auto px-8 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-['Bodoni_Moda'] tracking-[0.2em] text-neutral-800">DAISY</h1>
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-[#FAF9F6] to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 top-24 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -right-24 top-48 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 flex flex-col items-center relative">
          <div className="grid grid-cols-4 gap-4 absolute top-0 -left-24 w-40">
            <img src="https://images.unsplash.com/photo-1618519764620-7403abdbdfe9" alt="Fashion" className="w-full h-32 object-cover rounded-lg shadow-lg" />
            <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8" alt="Fashion" className="w-full h-48 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="grid grid-cols-4 gap-4 absolute top-0 -right-24 w-40">
            <img src="https://images.unsplash.com/photo-1618519764620-7403abdbdfe9" alt="Fashion" className="w-full h-48 object-cover rounded-lg shadow-lg" />
            <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8" alt="Fashion" className="w-full h-32 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="absolute top-40 -left-12 w-24 h-24 bg-black/5 rounded-full"></div>
          <div className="absolute top-60 -right-12 w-32 h-32 bg-black/5 rounded-full"></div>
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h2 className="font-['Bodoni_Moda'] text-4xl font-normal text-neutral-800 mb-2 tracking-tight">
                Style Redefined
              </h2>
              <p className="text-neutral-500 text-xs max-w-lg mx-auto font-['Roboto_Mono'] tracking-wide uppercase">
                Your personal fashion curator, delivering bespoke style guidance
              </p>
            </div>

            <div className="bg-neutral-50 rounded-2xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] p-4 sm:p-6 border border-neutral-100">
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