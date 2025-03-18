
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface DateRangePickerProps {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  onCheckInChange: (date: Date | undefined) => void;
  onCheckOutChange: (date: Date | undefined) => void;
}

export const DateRangePicker = memo(({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: DateRangePickerProps) => {
  const today = startOfToday();

  const handleCheckInChange = (date: Date | undefined) => {
    onCheckInChange(date);
    if (date && checkOut && isBefore(checkOut, date)) {
      onCheckOutChange(undefined);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm text-white/70 mb-1 block">Check-in</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                !checkIn && "text-white/50"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkIn ? format(checkIn, "d MMMM yyyy", { locale: it }) : <span>Scegli data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={handleCheckInChange}
              disabled={(date) => isBefore(date, today)}
              initialFocus
              className={cn("p-3 pointer-events-auto bg-white text-black")}
              classNames={{
                day_today: "bg-primary text-primary-foreground",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                day: cn(
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 hover:text-black"
                ),
                day_disabled: "text-gray-400 opacity-50 hover:bg-transparent",
                head_cell: "text-gray-500 font-normal text-[0.8rem]",
                caption: "text-black font-normal",
                nav_button: cn(
                  "text-gray-600 hover:bg-primary/10",
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                )
              }}
              fromDate={today}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <label className="text-sm text-white/70 mb-1 block">Check-out</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10",
                !checkOut && "text-white/50"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkOut ? format(checkOut, "d MMMM yyyy", { locale: it }) : <span>Scegli data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={onCheckOutChange}
              disabled={(date) => 
                (checkIn ? isBefore(date, addDays(checkIn, 1)) : isBefore(date, addDays(today, 1)))
              }
              initialFocus
              className={cn("p-3 pointer-events-auto bg-white text-black")}
              classNames={{
                day_today: "bg-primary text-primary-foreground",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                day: cn(
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 hover:text-black"
                ),
                day_disabled: "text-gray-400 opacity-50 hover:bg-transparent",
                head_cell: "text-gray-500 font-normal text-[0.8rem]",
                caption: "text-black font-normal",
                nav_button: cn(
                  "text-gray-600 hover:bg-primary/10",
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                )
              }}
              fromDate={checkIn ? addDays(checkIn, 1) : addDays(today, 1)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
