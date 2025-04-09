// ✅ frontend/components/ImageGrid.jsx — FULL FILE REPLACEMENT

import React from 'react';

const ImageGrid = ({ images, onFeedback }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <img
            src={image.url}
            alt="Generated"
            className="w-full h-auto rounded-xl shadow-md"
          />
          <div className="absolute bottom-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="bg-white rounded-full p-2 shadow hover:bg-green-100"
              onClick={() => onFeedback(image.id, true)}
              title="Like this image"
            >
              👍
            </button>
            <button
              className="bg-white rounded-full p-2 shadow hover:bg-red-100"
              onClick={() => onFeedback(image.id, false)}
              title="Dislike this image"
            >
              👎
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
