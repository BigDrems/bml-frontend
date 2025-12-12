import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { CreateSpeciesInput } from '../../../../types/species';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { conservationStatuses } from './constants';
import { updatableFields } from './constants';
import type { SpeciesFormModalProps } from './types';

export const SpeciesFormModal: React.FC<SpeciesFormModalProps> = ({
  isOpen,
  mode,
  species,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateSpeciesInput>({
    defaultValues: species || {},
  });

  useEffect(() => {
    if (species && mode === 'edit') {
      reset(species);
    } else {
      reset({});
    }
  }, [species, mode, reset]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (data: CreateSpeciesInput) => {
    onSubmit(data);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  // Helper to render fields dynamically
  const renderField = (field: string) => {
    const hasError = errors[field as keyof CreateSpeciesInput];
    
    switch (field) {
      case 'commonName':
        return (
          <div key={field} className="space-y-2">
            <label htmlFor="commonName" className="block text-sm font-semibold text-gray-900">
              Common Name <span className="text-red-500">*</span>
            </label>
            <input
              id="commonName"
              type="text"
              {...register('commonName', { 
                required: 'Common name is required',
                minLength: { value: 2, message: 'Common name must be at least 2 characters' }
              })}
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                hasError 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                  : 'border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
              }`}
              placeholder="e.g., Bengal Tiger"
              disabled={isLoading}
            />
            {errors.commonName && (
              <p className="text-red-600 text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.commonName.message}
              </p>
            )}
          </div>
        );
      case 'scientificName':
        return (
          <div key={field} className="space-y-2">
            <label htmlFor="scientificName" className="block text-sm font-semibold text-gray-900">
              Scientific Name <span className="text-red-500">*</span>
            </label>
            <input
              id="scientificName"
              type="text"
              {...register('scientificName', { 
                required: 'Scientific name is required',
                minLength: { value: 2, message: 'Scientific name must be at least 2 characters' }
              })}
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 italic ${
                hasError 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                  : 'border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
              }`}
              placeholder="e.g., Panthera tigris"
              disabled={isLoading}
            />
            {errors.scientificName && (
              <p className="text-red-600 text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.scientificName.message}
              </p>
            )}
          </div>
        );
      case 'conservationStatus':
        return (
          <div key={field} className="space-y-2">
            <label htmlFor="conservationStatus" className="block text-sm font-semibold text-gray-900">
              Conservation Status
            </label>
            <Controller
              name="conservationStatus"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <SelectTrigger 
                    id="conservationStatus"
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                  >
                    <SelectValue placeholder="Select conservation status" />
                  </SelectTrigger>
                  <SelectContent>
                    {conservationStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        );
      case 'description':
        return (
          <div key={field} className="md:col-span-2 space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={4}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
              placeholder="Describe the species characteristics, behavior, and notable features..."
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">Provide detailed information about the species</p>
          </div>
        );
      case 'habitat':
        return (
          <div key={field} className="md:col-span-2 space-y-2">
            <label htmlFor="habitat" className="block text-sm font-semibold text-gray-900">
              Habitat
            </label>
            <textarea
              id="habitat"
              {...register('habitat')}
              rows={3}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200 resize-none"
              placeholder="Describe the natural habitat and geographic distribution..."
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">Include natural environment and location details</p>
          </div>
        );
      case 'imageUrl':
        return (
          <div key={field} className="md:col-span-2 space-y-2">
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-900">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              {...register('imageUrl', {
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Please enter a valid URL starting with http:// or https://'
                }
              })}
              className={`w-full px-4 py-3 bg-white border-2 rounded-xl focus:outline-none transition-all duration-200 ${
                hasError 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                  : 'border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10'
              }`}
              placeholder="https://example.com/species-image.jpg"
              disabled={isLoading}
            />
            {errors.imageUrl && (
              <p className="text-red-600 text-sm flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.imageUrl.message}
              </p>
            )}
            {!hasError && (
              <p className="text-xs text-gray-500">Provide a direct link to a species image</p>
            )}
          </div>
        );
      default:
        // Render as a text input for all other fields
        return (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-semibold text-gray-900">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type="text"
              {...register(field as keyof CreateSpeciesInput)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
              disabled={isLoading}
            />
          </div>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New Species' : 'Edit Species'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {mode === 'create' ? 'Add a new species to the database' : 'Update species information'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/80 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {updatableFields.map(renderField)}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(handleFormSubmit)}
                disabled={isLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-teal-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-500/30 flex items-center gap-2 min-w-[140px] justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {mode === 'create' ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Species
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Update Species
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};