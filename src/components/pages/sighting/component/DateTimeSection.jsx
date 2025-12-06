import React from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import { format, parseISO } from 'date-fns';

export const DateTimeSection = ({ date, time, onDateChange, onTimeChange }) => {
  const handleDateSelect = (newDate) => {
    if (newDate) {
      onDateChange(format(newDate, 'yyyy-MM-dd'));
    } else {
      onDateChange('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#445133]">
        When did the sighting occur?
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Date</label>
          <DatePicker 
            date={date ? parseISO(date) : undefined}
            setDate={handleDateSelect}
            placeholder="Select sighting date"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-500">Time</label>
          <TimePicker 
            time={time}
            setTime={onTimeChange}
          />
        </div>
      </div>
    </div>
  );
};
