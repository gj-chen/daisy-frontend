import React from 'react';

export default function StylistResponse({ response }) {
  if (!response) return null;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm whitespace-pre-line text-gray-800">
      {response}
    </div>
  );
}
