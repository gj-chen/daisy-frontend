import React from 'react';

const FinalMoodboardModal = ({ isOpen, onClose, summary, images, rationales }) => {
  if (!isOpen) return null;

  // Helper function to extract the correct URL from an image object or string
  const getImageUrl = (img) => {
    if (!img) return '';

    if (typeof img === 'string') {
      return img;
    } else if (img.url) {
      return img.url;
    } else if (img.stored_image_url) {
      return img.stored_image_url;
    }

    return '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
        >
          &times;
        </button>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Daisy's Styling Summary</h2>
          <p className="text-gray-600 italic">{summary || 'No summary available.'}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images && images.map((img, index) => {
            const imageUrl = getImageUrl(img);
            return imageUrl ? (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Look ${index + 1}`}
                  className="w-full h-auto rounded-lg object-cover shadow"
                />
                {rationales && rationales[index] && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-4">
                    <p className="text-white text-sm text-center">{rationales[index]}</p>
                  </div>
                )}
              </div>
            ) : null;
          })}
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            className="px-4 py-2 border rounded-lg text-gray-500 hover:text-black text-sm"
            onClick={() => alert('Coming soon!')}
          >
            Download
          </button>
          <button
            className="px-4 py-2 border rounded-lg text-gray-500 hover:text-black text-sm"
            onClick={() => alert('Coming soon!')}
          >
            Share
          </button>
          <button
            className="px-4 py-2 border rounded-lg text-gray-500 hover:text-black text-sm"
            onClick={onClose}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalMoodboardModal;