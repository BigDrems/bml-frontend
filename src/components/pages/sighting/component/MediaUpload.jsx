import React, { useState, useRef, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import { ACCEPTED_FILE_TYPES, SUPPORTED_FORMATS } from '../const';
import { filterValidMediaFiles, createFilePreviews, cleanupPreviews, isVideoFile } from '../utils';

export const MediaUpload = ({ name = 'media' }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const formInputRef = useRef(null);

  useEffect(() => {
    // Create previews
    const newPreviews = createFilePreviews(files);
    setPreviews(newPreviews);

    // Update the form input with current files
    if (formInputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach(file => {
        dataTransfer.items.add(file);
      });
      formInputRef.current.files = dataTransfer.files;
    }

    // Cleanup
    return () => {
      cleanupPreviews(newPreviews);
    };
  }, [files]);

  const handleFiles = (newFiles) => {
    if (!newFiles || newFiles.length === 0) return;
    
    const validFiles = filterValidMediaFiles(newFiles);
    
    if (validFiles.length === 0) return;
    
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset the input so the same file can be selected again
      e.target.value = '';
    }
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div>
      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowse}
      >
        {/* File input for browse functionality (not submitted) */}
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          multiple 
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleFileInput}
          tabIndex={-1}
        />
        
        <div className="bg-[#90BE54]/10 p-3 rounded-full mb-4">
          <Upload className="w-6 h-6 text-[#90BE54]" />
        </div>
        <p className="text-sm text-gray-600 mb-1">
          Drag and drop files here or <span className="text-[#90BE54] hover:underline">click to browse</span>
        </p>
        <p className="text-xs text-gray-400">
          Supports: {SUPPORTED_FORMATS}
        </p>
      </div>

      {/* Hidden input for form submission */}
      <input
        type="file"
        ref={formInputRef}
        name={name}
        className="hidden"
        multiple
        accept={ACCEPTED_FILE_TYPES}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Preview Area */}
      {previews.length > 0 && (
        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
          {previews.map((preview, index) => (
            <div key={`${preview.id}-${index}`} className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 group shadow-sm border border-gray-200">
              {isVideoFile(preview.type) ? (
                <video src={preview.url} className="w-full h-full object-cover" />
              ) : (
                <img 
                  src={preview.url} 
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
              <button 
                type="button"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  removeFile(index); 
                }}
                className="absolute top-1 right-1 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label={`Remove file ${index + 1}`}
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
