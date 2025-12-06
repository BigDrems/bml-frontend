import React from 'react';

export const NotesSection = ({ value, onChange }) => {
  const maxLength = 300;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-[#445133]">
          Add Notes
        </label>
        <span className="text-xs text-gray-400">
          {value.length}/{maxLength}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        maxLength={maxLength}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#90BE54] focus:border-transparent transition outline-none resize-none"
        placeholder="Describe the animal's behavior, habitat, or any other details."
      />
    </div>
  );
};
