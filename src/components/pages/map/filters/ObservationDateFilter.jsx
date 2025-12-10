import React from 'react';
import { format, parseISO } from 'date-fns';
import { DatePicker } from '@/components/ui/date-picker';
import { FiXCircle } from 'react-icons/fi';

export const ObservationDateFilter = ({ startDate, endDate, onDateChange }) => {
  const handleDateChange = (type, date) => {
    const dateString = date ? format(date, 'yyyy-MM-dd') : '';
    onDateChange(type, dateString);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <DatePicker
          date={startDate ? parseISO(startDate) : undefined}
          setDate={(date) => handleDateChange('start', date)}
          placeholder="Pick a start date"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <DatePicker
          date={endDate ? parseISO(endDate) : undefined}
          setDate={(date) => handleDateChange('end', date)}
          placeholder="Pick an end date"
        />
      </div>
      {(startDate || endDate) && (
        <button
          type="button"
          onClick={() => onDateChange('clear')}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium shadow transition-colors duration-150"
        >
          <FiXCircle className="w-5 h-5 text-red-500" />
          Clear Dates
        </button>
      )}
    </div>
  );
};
