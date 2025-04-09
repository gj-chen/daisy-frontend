import React from 'react';

const FinalMoodboardModal = ({ isOpen, onClose, summary, images = [], rationales = [] }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">Your Final Moodboard</h2>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">✕</button>
        </div>

        <p className="mt-4 text-gray-700 italic">{summary}</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {images.map((url, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <img src={url} alt={`Final ${i + 1}`} className="rounded shadow max-h-72 object-cover" />
              {rationales[i] && (
                <p className="text-sm text-gray-600 text-center">{rationales[i]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button className="text-sm px-4 py-2 border rounded hover:bg-gray-100" onClick={onClose}>
            Close
          </button>
          <button className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalMoodboardModal;
