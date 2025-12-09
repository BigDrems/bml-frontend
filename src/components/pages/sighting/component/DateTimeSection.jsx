import React, { useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import { format, parseISO } from 'date-fns';

export const DateTimeSection = ({ name = 'datetime' }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDateSelect = (newDate) => {
    if (newDate) {
      setDate(format(newDate, 'yyyy-MM-dd'));
    } else {
      setDate('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#445133]">
        When did the sighting occur?
      </label>
      {/* Hidden inputs to store date and time */}
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="time" value={time} />
      
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
            setTime={setTime}
          />
        </div>
      </div>
    </div>
  );
};
