import React from 'react';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#1A1A1A] flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-serif tracking-tight">Jane</h1>
        <nav className="space-x-4 text-sm">
          <button className="hover:underline">Login</button>
          <button className="hover:underline">About</button>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center px-4 py-6">
        <div className="w-full max-w-6xl">
          <ChatPage />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-500">
        Made with <span className="text-red-400">❤️</span> in Toronto
      </footer>
    </div>
  );
};

export default App;
