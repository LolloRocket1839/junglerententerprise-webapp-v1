
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/use-toast';

const guestFormSchema = z.object({
  fullName: z.string().min(3, "Il nome deve essere di almeno 3 caratteri"),
  email: z.string().email("Inserisci un'email valida"),
  phone: z.string().min(8, "Inserisci un numero di telefono valido"),
  specialRequests: z.string().optional()
});

type GuestFormData = z.infer<typeof guestFormSchema>;

interface GuestInfoFormProps {
  onSubmit: (data: GuestFormData) => void;
  bookingData: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
  };
}

export const GuestInfoForm = ({ onSubmit, bookingData }: GuestInfoFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema)
  });
  const { toast } = useToast();

  const onSubmitForm = (data: GuestFormData) => {
    try {
      onSubmit(data);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio del form",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6 bg-white/5 border-white/10">
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Informazioni di Contatto
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70 mb-1 block">Nome completo</label>
              <Input
                {...register('fullName')}
                className="bg-white/5 border-white/10 text-white"
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <label className="text-sm text-white/70 mb-1 block">Email</label>
              <Input
                {...register('email')}
                type="email"
                className="bg-white/5 border-white/10 text-white"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="text-sm text-white/70 mb-1 block">Telefono</label>
              <Input
                {...register('phone')}
                className="bg-white/5 border-white/10 text-white"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-white/70 mb-1 block">Richieste speciali</label>
              <Textarea
                {...register('specialRequests')}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Allergie, preferenze, etc."
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex justify-between text-white/70">
            <span>Check-in</span>
            <span>{format(bookingData.checkIn, 'dd MMM yyyy', { locale: it })}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Check-out</span>
            <span>{format(bookingData.checkOut, 'dd MMM yyyy', { locale: it })}</span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Ospiti</span>
            <span>{bookingData.guests}</span>
          </div>
          <div className="flex justify-between text-white font-semibold pt-3 border-t border-white/10">
            <span>Totale</span>
            <span>€{bookingData.totalPrice}</span>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Conferma Prenotazione
        </Button>
      </form>
    </Card>
  );
};
