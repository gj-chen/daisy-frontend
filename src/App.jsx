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
    <div className="min-h-screen bg-white">
      <header className="w-full border-b border-neutral-200 fixed top-0 z-10 bg-white">
        <div className="max-w-screen-xl mx-auto px-8 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-['Bodoni_Moda'] tracking-[0.2em] text-neutral-800">DAISY</h1>
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-16 relative">
        <div className="fixed inset-0 grid grid-cols-3 gap-4 p-8 opacity-5 pointer-events-none overflow-hidden">
          <img src="https://media.sheerluxe.com/LOELadb7VxNuhkJ0EI6rG0kRA7w=/1200x0/smart/https%3A%2F%2Fsheerluxe.com%2Fsites%2Fsheerluxe%2Ffiles%2Farticles%2F2024%2F09%2Fsl-site-assets-040924-hero-thumb-fashion-moodboards.png" alt="Fashion Moodboard" className="w-full h-80 object-cover rounded-lg" />
          <img src="https://media.sheerluxe.com/i2tvRtUWNtYW5-GRR3IpoBJcfCc=/3840x0/smart/filters:no_upscale()/https%3A%2F%2Fsheerluxe.com%2Fsites%2Fsheerluxe%2Ffiles%2Farticles%2F2024%2F09%2Fsl-fashion-moodboards-040924-emma-2.png" alt="Fashion Moodboard" className="w-full h-80 object-cover rounded-lg" />
          <img src="https://media.sheerluxe.com/tP6kxK9X8cXVfaB7rp6WmZLr6ME=/3840x0/smart/filters:no_upscale()/https%3A%2F%2Fsheerluxe.com%2Fsites%2Fsheerluxe%2Ffiles%2Farticles%2F2024%2F09%2Fsl-fashion-moodboards-040924-lu.png" alt="Fashion Moodboard" className="w-full h-80 object-cover rounded-lg" />
          <img src="https://media.sheerluxe.com/0h4k3irK00_M0Dzz282Kwqpx47U=/3840x0/smart/filters:no_upscale()/https%3A%2F%2Fsheerluxe.com%2Fsites%2Fsheerluxe%2Ffiles%2Farticles%2F2024%2F09%2Fsl-fashion-moodboards-040924-nana.png" alt="Fashion Moodboard" className="w-full h-80 object-cover rounded-lg" />
          <img src="https://media.sheerluxe.com/prcFGU-NZDpN0wogKRTQNYb4drM=/3840x0/smart/filters:no_upscale()/https%3A%2F%2Fsheerluxe.com%2Fsites%2Fsheerluxe%2Ffiles%2Farticles%2F2024%2F09%2Fsl-fashion-moodboards-040924-sapna.png" alt="Fashion Moodboard" className="w-full h-80 object-cover rounded-lg" />
          <img src="https://media.sheerluxe.com/rj8iy-klo4jdG6Mdl9bUdtol3sY=/3840x0/smart/filters:no_upscale()/https%3A%2F%2Fsheerluxe.com%2Fsites%2Fsheerluxe%2Ffiles%2Farticles%2F2024%2F09%2Fsl-fashion-moodboards-040924-florence.png" alt="Fashion Moodboard" className="w-full h-80 object-cover rounded-lg" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="font-['Bodoni_Moda'] text-4xl font-normal text-neutral-800 mb-2">
                Style Redefined
              </h2>
              <p className="text-neutral-500 text-sm font-['Roboto_Mono']">
                Your personal fashion curator, delivering bespoke style guidance
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-100">
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