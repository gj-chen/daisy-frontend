import React, { useState } from 'react';

const MoodboardCanvas = ({ imageUrls = [], onFeedback, onGenerateMoodboard }) => {
  const [selected, setSelected] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(false);

  const toggleSelect = (url) => {
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4">
        {imageUrls.map((img, index) => (
          <div
            key={index}
            className={`relative group rounded overflow-hidden shadow border cursor-pointer ${
              selected.includes(img.url) ? 'ring-4 ring-black/70' : ''
            }`}
            onClick={() => toggleSelect(img.url)}
          >
            <img
              src={img.url}
              alt={`Moodboard ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Explanation overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-center justify-center text-sm text-center">
              <p>{img.explanation}</p>
            </div>

            {/* Feedback buttons */}
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(`I liked image ${index + 1}`);
                }}
                className="bg-white text-black px-2 py-1 text-xs rounded hover:bg-green-200"
              >
                ❤️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(`I didn’t like image ${index + 1}`);
                }}
                className="bg-white text-black px-2 py-1 text-xs rounded hover:bg-red-200"
              >
                ✖️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Generate moodboard panel */}
      {imageUrls.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 border-t pt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeGuide}
              onChange={(e) => setIncludeGuide(e.target.checked)}
            />
            Include styling guide?
          </label>
          <button
            disabled={selected.length === 0}
            onClick={() => onGenerateMoodboard(selected, includeGuide)}
            className="bg-black text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Generate Final Moodboard
          </button>
          {/* New Buttons for Directional Control */}
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => onFeedback("Can you refine this direction?")}
              className="bg-white text-black border border-gray-300 py-2 px-4 rounded hover:bg-gray-100"
            >
              🔁 Refine This Direction
            </button>
            <button
              onClick={() => onFeedback("Show me another direction for the same goal.")}
              className="bg-white text-black border border-gray-300 py-2 px-4 rounded hover:bg-gray-100"
            >
              🎨 Try Another Look
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodboardCanvas;
