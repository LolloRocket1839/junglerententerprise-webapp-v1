
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TouristProperty } from "@/types/tourist";
import { toast } from "sonner";
import { DateRangePicker } from "./DateRangePicker";
import { useBookingAvailability } from "@/hooks/useBookingAvailability";
import { Loader2, Minus, Plus } from "lucide-react";
import { addDays, nextSaturday, nextSunday } from "date-fns";
import { useLanguage } from '@/contexts/LanguageContext';
import { stayTranslations } from '@/translations/stay';

interface BookingFormProps {
  property: TouristProperty;
  onBook: (dates: { checkIn: Date; checkOut: Date; guests: number }) => void;
}

export const BookingForm = ({ property, onBook }: BookingFormProps) => {
  const { language } = useLanguage();
  const t = (key: string) => stayTranslations[language]?.[key] || key;
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  // Smart defaults - set next weekend
  useEffect(() => {
    const today = new Date();
    const smartCheckIn = nextSaturday(today);
    const smartCheckOut = nextSunday(today);
    
    setCheckIn(smartCheckIn);
    setCheckOut(smartCheckOut);
  }, []);
  
  const { isAvailable, nights, isLoading } = useBookingAvailability({
    property,
    checkIn,
    checkOut
  });

  const handleSubmit = () => {
    if (!checkIn || !checkOut) {
      toast.error(t('selectDates'));
      return;
    }
    
    if (!isAvailable) {
      toast.error(t('datesNotAvailable'));
      return;
    }
    
    onBook({ checkIn, checkOut, guests });
  };


  // Calculate if we can proceed (has dates and availability check is complete)
  const canProceed = checkIn && checkOut && !isLoading && isAvailable;

  const basePrice = property.price_per_night * nights;
  const cleaningFee = property.cleaning_fee;
  const total = basePrice + cleaningFee;

  return (
    <Card className="p-4 bg-white/5 border-white/10 shadow-lg">
      <div className="space-y-4">
        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
        />

        {/* Minimal Guest Selector */}
        <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
          <span className="text-white/80 text-sm">{t('guests')}</span>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
              className="h-8 w-8 p-0 rounded-full bg-white/10 hover:bg-white/20 border-0 disabled:opacity-30"
            >
              <Minus size={14} />
            </Button>
            <span className="text-white font-medium w-8 text-center">{guests}</span>
            <Button
              type="button"
              onClick={() => setGuests(Math.min(property.capacity, guests + 1))}
              disabled={guests >= property.capacity}
              className="h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary/80 border-0 disabled:opacity-30"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>

        {/* Always Visible Compact Pricing */}
        {nights > 0 && (
          <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex justify-between text-sm text-white/70 mb-1">
              <span>€{property.price_per_night} × {nights} {nights === 1 ? t('night') : t('nights')}</span>
              <span>€{basePrice}</span>
            </div>
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>{t('cleaningFees')}</span>
              <span>€{cleaningFee}</span>
            </div>
            <div className="flex justify-between font-semibold text-white pt-2 border-t border-white/10">
              <span>{t('total')}</span>
              <span>€{total}</span>
            </div>
          </div>
        )}

        <Button
          className="w-full bg-primary hover:bg-primary/90 py-4 text-base font-medium transition-all duration-300"
          disabled={!canProceed}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('checking')}...
            </>
          ) : !checkIn || !checkOut ? (
            t('selectDates')
          ) : isAvailable ? (
            t('bookNow')
          ) : (
            t('notAvailable')
          )}
        </Button>
      </div>
    </Card>
  );
};
