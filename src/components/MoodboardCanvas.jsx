import React, { useState, useEffect } from 'react';

const MoodboardCanvas = ({ imageUrls = [], onFeedback, onSendMessage }) => {
  const [feedbackState, setFeedbackState] = useState({});
  const [showRefine, setShowRefine] = useState(false);

  useEffect(() => {
    const count = Object.values(feedbackState).filter(Boolean).length;
    setShowRefine(count >= 2);
  }, [feedbackState]);

  const handleFeedback = (url, type) => {
    const updated = {
      ...feedbackState,
      [url]: feedbackState[url] === type ? null : type
    };
    setFeedbackState(updated);
    if (onFeedback) onFeedback(url, type);
  };

  const handleRefineClick = () => {
    onSendMessage("Refine based on feedback");
  };

  return (
    <div className="flex flex-col gap-4 transition-opacity duration-500">
      {imageUrls.length === 0 ? (
        <div className="text-center text-gray-400 mt-20 italic">
          Your curated moodboard will appear here...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {imageUrls.map((img, index) => {
              const feedback = feedbackState[img.url];
              return (
                <div
                  key={index}
                  className="relative group rounded overflow-hidden shadow border transition duration-300 hover:shadow-md"
                >
                  <img
                    src={img.url}
                    alt={`Moodboard ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/60 text-white opacity-0 group-hover:opacity-100 p-2 text-sm flex items-center justify-center text-center">
                    {img.rationale || 'No rationale yet.'}
                  </div>
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

          {showRefine && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleRefineClick}
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Refine Based on Feedback
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoodboardCanvas;
