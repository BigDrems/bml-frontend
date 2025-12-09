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

  if (!isOpen) return null;

  const handleFormSubmit = (data: CreateSpeciesInput) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {mode === 'create' ? 'Create New Species' : 'Edit Species'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            <svg
              className="w-6 h-6"
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

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Common Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Common Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('commonName', { required: 'Common name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.commonName && (
                <p className="text-red-500 text-xs mt-1">{errors.commonName.message}</p>
              )}
            </div>

            {/* Scientific Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scientific Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('scientificName', { required: 'Scientific name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.scientificName && (
                <p className="text-red-500 text-xs mt-1">{errors.scientificName.message}</p>
              )}
            </div>

            {/* Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Family</label>
              <input
                type="text"
                {...register('family')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input
                type="text"
                {...register('order')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <input
                type="text"
                {...register('class')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Conservation Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conservation Status
              </label>
              <Controller
                name="conservationStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
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
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              {...register('imageUrl')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Habitat */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Habitat</label>
            <textarea
              {...register('habitat')}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Distribution */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Distribution</label>
            <textarea
              {...register('distribution')}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {mode === 'create' ? 'Create Species' : 'Update Species'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
