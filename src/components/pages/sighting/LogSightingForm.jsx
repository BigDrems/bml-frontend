import React, { useActionState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SpeciesSearch } from './component/SpeciesSearch';
import { LocationPicker } from './component/LocationPicker';
import { DateTimeSection } from './component/DateTimeSection';
import { NotesSection } from './component/NotesSection';
import { MediaUpload } from './component/MediaUpload';
import { createSighting } from '@/api/sightings';
import { buildSightingFormData, validateSightingForm } from './utils';

export const LogSightingForm = () => {
  const navigate = useNavigate();

  // Form action handler
  const submitSighting = async (prevState, formData) => {
    try {
      // Extract values from FormData
      const location = formData.get('location') ? JSON.parse(formData.get('location')) : null;
      const date = formData.get('date') || '';
      const time = formData.get('time') || '';
      const notes = formData.get('notes') || '';
      const files = formData.getAll('media');

      // Validate form
      const validation = validateSightingForm({ location, files });
      if (!validation.isValid) {
        validation.errors.forEach(error => toast.error(error));
        return { success: false, error: validation.errors[0] };
      }

      // Build FormData using utility function
      const sightingFormData = buildSightingFormData({
        date,
        time,
        location,
        notes,
        files,
        // speciesId: formData.get('speciesId'), // Add when species selection is implemented
      });

      await createSighting(sightingFormData);
      
      toast.success("Sighting submitted successfully!");
      navigate('/map');
      
      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to submit sighting";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const [state, formAction, isPending] = useActionState(submitSighting, { success: false, error: null });

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-[#445133] mb-8 font-roboto-serif">Log a New Sighting</h1>
      
      <form action={formAction} className="space-y-8">
        <SpeciesSearch name="speciesQuery" />
        
        <LocationPicker name="location" />
        
        <DateTimeSection name="datetime" />
        
        <NotesSection name="notes" />
        
        <MediaUpload name="media" />

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-[#445133] transition-colors"
            disabled={isPending}
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isPending}
            className="px-8 py-3 bg-[#90BE54] hover:bg-[#7da845] text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-[#90BE54]/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Submitting...' : 'Submit Sighting'}
          </button>
        </div>
      </form>
    </div>
  );
};
