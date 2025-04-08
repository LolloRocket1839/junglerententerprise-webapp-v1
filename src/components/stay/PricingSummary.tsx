
import { TouristProperty } from "@/types/tourist";
import { Check } from "lucide-react";

interface PricingSummaryProps {
  property: TouristProperty;
  nights: number;
}

export const PricingSummary = ({ property, nights }: PricingSummaryProps) => {
  const basePrice = property.price_per_night * nights;
  const cleaningFee = property.cleaning_fee;
  const total = basePrice + cleaningFee;
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white/70">€{property.price_per_night} x {nights} {nights === 1 ? 'notte' : 'notti'}</span>
          <span className="text-white">€{basePrice}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white/70">Spese di pulizia</span>
          <span className="text-white">€{cleaningFee}</span>
        </div>

        <div className="border-t border-white/10 my-2 pt-2"></div>
        
        <div className="flex justify-between items-center font-bold">
          <span className="text-white">Totale</span>
          <span className="text-white text-lg">€{total}</span>
        </div>
      </div>

      <div className="bg-white/5 p-3 rounded-md space-y-1">
        <h4 className="text-sm font-medium text-white/90 mb-2">Include:</h4>
        {property.amenities && property.amenities.slice(0, 4).map((amenity, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-white/70">
            <Check className="h-3 w-3 text-green-500" />
            <span>{amenity}</span>
          </div>
        ))}
        {property.amenities && property.amenities.length > 4 && (
          <div className="text-xs text-white/50 mt-1">+ altri {property.amenities.length - 4} servizi</div>
        )}
      </div>
    </div>
  );
};
