
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { format, addDays, isBefore, startOfToday, isValid } from "date-fns";
import { it } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { memo, useEffect, useState } from "react";

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
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);

  // Calculate minimum check-out date (day after check-in or tomorrow)
  const minCheckOutDate = checkIn ? addDays(checkIn, 1) : addDays(today, 1);

  const handleCheckInChange = (date: Date | undefined) => {
    onCheckInChange(date);
    
    // If selected check-in date is after current check-out date, clear check-out
    if (date && checkOut && isBefore(checkOut, date)) {
      onCheckOutChange(undefined);
    }
    
    // Close check-in popover and open check-out popover when date is selected
    if (date && isValid(date)) {
      setTimeout(() => {
        setOpenCheckIn(false);
        if (!checkOut) {
          setOpenCheckOut(true);
        }
      }, 300);
    }
  };

  const handleCheckOutChange = (date: Date | undefined) => {
    onCheckOutChange(date);
    
    // Close check-out popover when date is selected
    if (date && isValid(date)) {
      setTimeout(() => {
        setOpenCheckOut(false);
      }, 300);
    }
  };

  // Clear check-out if check-in is removed
  useEffect(() => {
    if (!checkIn && checkOut) {
      onCheckOutChange(undefined);
    }
  }, [checkIn, checkOut, onCheckOutChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label htmlFor="check-in-date" className="text-sm text-white/70 block">Check-in</label>
        <Popover open={openCheckIn} onOpenChange={setOpenCheckIn}>
          <PopoverTrigger asChild>
            <Button
              id="check-in-date"
              variant="outline"
              className={cn(
                "w-full justify-start font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 py-6",
                !checkIn && "text-white/50"
              )}
              aria-label="Seleziona data di check-in"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkIn ? format(checkIn, "d MMMM yyyy", { locale: it }) : <span>Seleziona data</span>}
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
      
      <div className="space-y-1 relative">
        <label htmlFor="check-out-date" className="text-sm text-white/70 block">Check-out</label>
        <div className="md:absolute md:left-0 md:right-0 md:top-1/2 md:-translate-y-1/2 pointer-events-none hidden md:flex justify-center items-center">
          <ChevronRight className="h-4 w-4 text-white/30" />
        </div>
        <Popover open={openCheckOut} onOpenChange={setOpenCheckOut}>
          <PopoverTrigger asChild>
            <Button
              id="check-out-date"
              variant="outline"
              className={cn(
                "w-full justify-start font-normal bg-white/5 border-white/10 text-white hover:bg-white/10 py-6",
                !checkOut && "text-white/50"
              )}
              disabled={!checkIn}
              aria-label="Seleziona data di check-out"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkOut ? format(checkOut, "d MMMM yyyy", { locale: it }) : <span>{checkIn ? "Seleziona data" : "Prima seleziona check-in"}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={handleCheckOutChange}
              disabled={(date) => isBefore(date, minCheckOutDate)}
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
              fromDate={minCheckOutDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});

DateRangePicker.displayName = "DateRangePicker";
