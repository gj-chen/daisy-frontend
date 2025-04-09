// ✅ frontend/components/CTAButtons.jsx — FULL FILE REPLACEMENT

import React from 'react';

const CTAButtons = ({ onSend, onGenerateMoodboard, showButtons }) => {
  if (!showButtons) return null;

  const handleRefine = () => {
    onSend("Let's refine this direction.", 'refine');
  };

  const handleTryAnother = () => {
    onSend("Let's try another look.", 'regenerate');
  };

  const handleGenerateMoodboard = () => {
    // Placeholder — assumes all current images are selected
    // Replace this with selected state if applicable
    onGenerateMoodboard([], true);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4 px-4">
      <button
        onClick={handleRefine}
        className="text-sm bg-black text-white px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        Refine this direction
      </button>
      <button
        onClick={handleTryAnother}
        className="text-sm bg-neutral-200 text-black px-4 py-2 rounded-full hover:bg-neutral-300 transition"
      >
        Try another look
      </button>
      <button
        onClick={handleGenerateMoodboard}
        className="text-sm bg-blue-600 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        Generate final moodboard
      </button>
    </div>
  );
};

export default CTAButtons;
