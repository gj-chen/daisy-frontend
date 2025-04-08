import React from 'react';

const MoodboardCanvas = ({ imageUrls, onFeedback }) => {
  const handleFeedback = (index, liked) => {
    const label = liked ? 'loved' : 'didn’t like';
    const feedbackText = `I ${label} the look in image ${index + 1}`;
    onFeedback(feedbackText);
  };

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Your Moodboard</h2>
      <div className="grid grid-cols-2 gap-4">
        {imageUrls.map((url, i) => (
          <div key={i} className="relative group">
            <img
              src={url}
              alt={`moodboard ${i}`}
              className="w-full rounded-xl shadow-md"
            />
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleFeedback(i, true)}
                className="p-1 rounded-full bg-white shadow hover:bg-green-100"
              >
                ❤️
              </button>
              <button
                onClick={() => handleFeedback(i, false)}
                className="p-1 rounded-full bg-white shadow hover:bg-red-100"
              >
                ✖️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodboardCanvas;
