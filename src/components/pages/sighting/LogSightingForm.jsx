import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SpeciesSearch } from './component/SpeciesSearch';
import { LocationPicker } from './component/LocationPicker';
import { DateTimeSection } from './component/DateTimeSection';
import { NotesSection } from './component/NotesSection';
import { MediaUpload } from './component/MediaUpload';
import { createSighting } from '@/api/sightings';

export const LogSightingForm = () => {
  const navigate = useNavigate();
  const [speciesQuery, setSpeciesQuery] = useState('');
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
      toast.error("Please select a location");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Combine date and time
      let observedAt = new Date();
      if (date) {
        const dateStr = time ? `${date}T${time}` : date;
        observedAt = new Date(dateStr);
      }
      formData.append('observedAt', observedAt.toISOString());

      if (location) {
        formData.append('lat', location.lat.toString());
        formData.append('lng', location.lng.toString());
      }

      if (notes) formData.append('notes', notes);
      
      // If we had a species ID, we would append it here.
      // For now, we rely on AI classification if no species is selected.
      // formData.append('speciesId', selectedSpeciesId); 

      files.forEach(file => {
        formData.append('media', file);
      });

      await createSighting(formData);
      
      toast.success("Sighting submitted successfully!");
      navigate('/map'); // Redirect to map or home
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit sighting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-[#445133] mb-8 font-roboto-serif">Log a New Sighting</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <SpeciesSearch value={speciesQuery} onChange={setSpeciesQuery} />
        
        <LocationPicker position={location} setPosition={setLocation} />
        
        <DateTimeSection 
          date={date} 
          time={time} 
          onDateChange={setDate} 
          onTimeChange={setTime} 
        />
        
        <NotesSection value={notes} onChange={setNotes} />
        
        <MediaUpload onFilesChange={setFiles} />

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-[#445133] transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#90BE54] hover:bg-[#7da845] text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-[#90BE54]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Sighting'}
          </button>
        </div>
      </form>
    </div>
  );
};
