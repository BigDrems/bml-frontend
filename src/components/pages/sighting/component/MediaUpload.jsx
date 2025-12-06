import React, { useState, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

export const MediaUpload = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Create previews
    const newPreviews = files.map(file => ({
      id: file.name,
      url: URL.createObjectURL(file),
      type: file.type
    }));
    setPreviews(newPreviews);

    // Cleanup
    return () => {
      newPreviews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [files]);

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    if (onFilesChange) onFilesChange(updatedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFilesChange) onFilesChange(updatedFiles);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#445133]">
        Upload Photos or Videos
      </label>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleBrowse}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          multiple 
          accept="image/*,video/*"
          onChange={handleFileInput}
        />
        <div className="bg-[#90BE54]/10 p-3 rounded-full mb-4">
          <Upload className="w-6 h-6 text-[#90BE54]" />
        </div>
        <p className="text-sm text-gray-600 mb-1">
          Drag and drop files here or <span className="text-[#90BE54] hover:underline">click to browse</span>
        </p>
        <p className="text-xs text-gray-400">
          Supports: JPG, PNG, MP4, MOV
        </p>
      </div>

      {/* Preview Area */}
      {previews.length > 0 && (
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group shadow-sm border border-gray-200">
              {preview.type.startsWith('video/') ? (
                <video src={preview.url} className="w-full h-full object-cover" />
              ) : (
                <img 
                  src={preview.url} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <X className="w-3 h-3 text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
