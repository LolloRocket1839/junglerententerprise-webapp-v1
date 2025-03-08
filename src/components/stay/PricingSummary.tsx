
import { TouristProperty } from "@/types/tourist";

interface PricingSummaryProps {
  property: TouristProperty;
  nights: number;
}

export const PricingSummary = ({ property, nights }: PricingSummaryProps) => {
  const total = nights * property.price_per_night + property.cleaning_fee;

  return (
    <div className="space-y-3 pt-4 border-t border-white/10">
      <div className="flex justify-between text-white/70">
        <span>€{property.price_per_night} × {nights} notti</span>
        <span>€{property.price_per_night * nights}</span>
      </div>
      <div className="flex justify-between text-white/70">
        <span>Pulizie</span>
        <span>€{property.cleaning_fee}</span>
      </div>
      <div className="flex justify-between text-white font-semibold pt-3 border-t border-white/10">
        <span>Totale</span>
        <span>€{total}</span>
      </div>
    </div>
  );
};
