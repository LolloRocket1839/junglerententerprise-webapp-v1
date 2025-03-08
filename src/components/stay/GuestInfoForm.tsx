
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface GuestInfoFormProps {
  onSubmit: (data: any) => void;
  bookingData: {
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
  };
}

export const GuestInfoForm = ({ onSubmit, bookingData }: GuestInfoFormProps) => {
  const { register, handleSubmit } = useForm();

  return (
    <Card className="p-6 bg-white/5 border-white/10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Informazioni di Contatto
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/70 mb-1 block">Nome completo</label>
              <Input
                {...register('fullName')}
                required
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/70 mb-1 block">Email</label>
              <Input
                {...register('email')}
                type="email"
                required
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/70 mb-1 block">Telefono</label>
              <Input
                {...register('phone')}
                required
                className="bg-white/5 border-white/10 text-white"
              />
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
