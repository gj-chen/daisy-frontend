import React, { useState } from 'react';

const MoodboardCanvas = ({
  imageUrls = [],
  onFeedback,
  onGenerateMoodboard,
  onSendMessage
}) => {
  const [selected, setSelected] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(false);
  const [feedbackState, setFeedbackState] = useState({});

  const toggleSelect = (url) => {
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const handleFeedback = (url, type) => {
    if (onFeedback) onFeedback(url, type);
    setFeedbackState((prev) => ({ ...prev, [url]: type }));
  };

  const handleRefineClick = () => {
    onSendMessage("Refine this direction");
  };

  const handleTryAnotherClick = () => {
    onSendMessage("Try another look");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-4">
        {imageUrls.map((img, index) => {
          const feedback = feedbackState[img.url];
          return (
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
                className="w-full h-auto object-cover transition-transform duration-200 group-hover:scale-105"
              />
              {/* Rationale hover */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/60 text-white opacity-0 group-hover:opacity-100 p-2 text-sm flex items-center justify-center text-center">
                {img.rationale || 'No stylist rationale yet.'}
              </div>
              {/* Feedback buttons */}
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  className={feedback === 'like' ? 'opacity-50' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeedback(img.url, 'like');
                  }}
                >
                  ❤️
                </button>
                <button
                  className={feedback === 'dislike' ? 'opacity-50' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeedback(img.url, 'dislike');
                  }}
                >
                  ✖️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {imageUrls.length > 0 && (
        <>
          <label className="flex items-center gap-2 text-sm mt-2">
            <input
              type="checkbox"
              checked={includeGuide}
              onChange={(e) => setIncludeGuide(e.target.checked)}
            />
            Include styling guide?
          </label>

          <button
            className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800"
            onClick={() => onGenerateMoodboard(selected, includeGuide)}
          >
            Generate Final Moodboard
          </button>

          <div className="flex gap-2 justify-center">
            <button
              className="text-sm px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
              onClick={handleRefineClick}
            >
              🔁 Refine This Direction
            </button>
            <button
              className="text-sm px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
              onClick={handleTryAnotherClick}
            >
              🍂 Try Another Look
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodboardCanvas;