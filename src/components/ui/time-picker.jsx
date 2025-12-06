import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function TimePicker({ time, setTime }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Generate hours 00-23
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  // Generate minutes 00-59
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const [selectedHour, setSelectedHour] = React.useState(time ? time.split(':')[0] : '12');
  const [selectedMinute, setSelectedMinute] = React.useState(time ? time.split(':')[1] : '00');

  React.useEffect(() => {
    if (time) {
        const [h, m] = time.split(':');
        setSelectedHour(h);
        setSelectedMinute(m);
    }
  }, [time]);

  const handleTimeChange = (h, m) => {
      setSelectedHour(h);
      setSelectedMinute(m);
      setTime(`${h}:${m}`);
  };

  // Scroll to selected time on open
  const hourRef = React.useRef(null);
  const minuteRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && hourRef.current && minuteRef.current) {
        hourRef.current.scrollIntoView({ block: 'center' });
        minuteRef.current.scrollIntoView({ block: 'center' });
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !time && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex h-64">
            <div className="flex flex-col border-r border-gray-100">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100 bg-gray-50 text-center">Hour</div>
                <div className="overflow-y-auto p-2 no-scrollbar">
                    {hours.map((h) => (
                        <button
                            key={h}
                            ref={selectedHour === h ? hourRef : null}
                            onClick={() => handleTimeChange(h, selectedMinute)}
                            className={cn(
                                "w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors text-center block mb-1",
                                selectedHour === h && "bg-[#90BE54] text-white hover:bg-[#90BE54]"
                            )}
                        >
                            {h}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="px-4 py-2 text-xs font-medium text-gray-500 border-b border-gray-100 bg-gray-50 text-center">Minute</div>
                <div className="overflow-y-auto p-2 no-scrollbar">
                    {minutes.map((m) => (
                        <button
                            key={m}
                            ref={selectedMinute === m ? minuteRef : null}
                            onClick={() => handleTimeChange(selectedHour, m)}
                            className={cn(
                                "w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors text-center block mb-1",
                                selectedMinute === m && "bg-[#90BE54] text-white hover:bg-[#90BE54]"
                            )}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
