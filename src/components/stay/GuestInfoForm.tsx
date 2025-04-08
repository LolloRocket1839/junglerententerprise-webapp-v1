
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Calendar, Mail, Phone, User } from "lucide-react";

interface GuestInfoFormProps {
  onSubmit: (guestInfo: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests?: string;
  }) => void;
  bookingData: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
  };
}

export const GuestInfoForm = ({ onSubmit, bookingData }: GuestInfoFormProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Nome completo richiesto";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email richiesta";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email non valida";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Numero di telefono richiesto";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        fullName,
        email,
        phone,
        specialRequests,
      });
    }
  };

  return (
    <div className="bg-white/5 border-white/10 rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Dati dell'ospite</h3>
      
      <div className="bg-white/5 rounded-md p-4 mb-6">
        <div className="flex items-center gap-2 text-white/80 mb-1">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">
            Dal {format(bookingData.checkIn, "d MMMM", { locale: it })} al {format(bookingData.checkOut, "d MMMM yyyy", { locale: it })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <User className="h-4 w-4" />
          <span className="text-sm">{bookingData.guests} {bookingData.guests === 1 ? "ospite" : "ospiti"}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm text-white/70 mb-1 block">
            Nome completo*
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`bg-white/5 border-white/10 text-white pl-10 ${errors.fullName ? "border-red-500" : ""}`}
              placeholder="Il tuo nome completo"
            />
          </div>
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-white/70 mb-1 block">
            Email*
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-white/5 border-white/10 text-white pl-10 ${errors.email ? "border-red-500" : ""}`}
              placeholder="La tua email"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="text-sm text-white/70 mb-1 block">
            Telefono*
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`bg-white/5 border-white/10 text-white pl-10 ${errors.phone ? "border-red-500" : ""}`}
              placeholder="Il tuo numero di telefono"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="specialRequests" className="text-sm text-white/70 mb-1 block">
            Richieste speciali
          </label>
          <Textarea
            id="specialRequests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="bg-white/5 border-white/10 text-white min-h-[100px]"
            placeholder="Richieste o note aggiuntive per l'host..."
          />
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span className="text-white">Prezzo totale</span>
          <span className="text-xl font-bold text-white">€{bookingData.totalPrice}</span>
        </div>
        <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 py-6">
          Conferma e prenota
        </Button>
        <p className="text-xs text-white/50 text-center mt-2">
          Cliccando su "Conferma e prenota" accetti i nostri termini e condizioni
        </p>
      </div>
    </div>
  );
};
