// components/MoodboardModal.jsx
import React from "react";

const MoodboardModal = ({ isOpen, onClose, imageUrls = [], rationale = {} }) => {
  if (!isOpen) return null;

  const { goal, whatWorks, avoid, tip } = rationale;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#FAF9F6] w-full max-w-5xl mx-auto rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="text-xs text-center text-gray-400 mb-2">
          🧪 Moodboard modal is rendering ({imageUrls.length} images)
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Moodboard</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-sm"
          >
            Close ✕
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
          {imageUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Moodboard image ${idx}`}
              className="w-full h-40 object-cover rounded-xl"
            />
          ))}
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          {goal && (
            <p>
              <strong>🎯 Goal:</strong> {goal}
            </p>
          )}
          {whatWorks && (
            <p>
              <strong>✅ What Works:</strong> {whatWorks}
            </p>
          )}
          {avoid && (
            <p>
              <strong>🚫 What to Avoid:</strong> {avoid}
            </p>
          )}
          {tip && (
            <p>
              <strong>💡 Style Tip:</strong> {tip}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodboardModal;
