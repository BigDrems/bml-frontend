import React, { useState } from 'react';

export const NotesSection = ({ name = 'notes' }) => {
  const maxLength = 300;
  const [charCount, setCharCount] = useState(0);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-[#445133]">
          Add Notes
        </label>
        <span className="text-xs text-gray-400">
          {charCount}/{maxLength}
        </span>
      </div>
      <textarea
        name={name}
        onChange={(e) => setCharCount(e.target.value.length)}
        rows={4}
        maxLength={maxLength}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#90BE54] focus:border-transparent transition outline-none resize-none"
        placeholder="Describe the animal's behavior, habitat, or any other details."
      />
    </div>
  );
};
