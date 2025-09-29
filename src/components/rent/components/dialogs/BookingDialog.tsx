import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { StudentProperty } from '@/types/rental';
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, Upload, FileText, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface BookingDialogProps {
  property: StudentProperty | null;
  isOpen: boolean;
  onClose: () => void;
}

type BookingStep = 'dates' | 'personal' | 'documents' | 'payment';

export const BookingDialog = ({
  property,
  isOpen,
  onClose,
}: BookingDialogProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState<BookingStep>('dates');
  const [moveInDate, setMoveInDate] = useState<Date>();
  const [moveOutDate, setMoveOutDate] = useState<Date>();
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'semester' | 'annual'>('monthly');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!property) return null;

  const calculateTotal = () => {
    if (!moveInDate || !moveOutDate) return 0;
    const months = Math.ceil((moveOutDate.getTime() - moveInDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthlyRate = property.discounted_price_monthly;
    
    if (paymentPlan === 'annual') return monthlyRate * 12 * 0.9; // 10% discount
    if (paymentPlan === 'semester') return monthlyRate * 6 * 0.95; // 5% discount
    return monthlyRate * months;
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Errore",
        description: "Devi essere autenticato per prenotare",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create booking application
      const { error: applicationError } = await supabase
        .from('student_applications')
        .insert({
          student_id: user.id,
          property_id: property.id,
          move_in_date: moveInDate?.toISOString(),
          move_out_date: moveOutDate?.toISOString(),
          payment_plan: paymentPlan,
          status: 'pending',
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          university: university
        });

      if (applicationError) throw applicationError;

      toast({
        title: "✅ Richiesta inviata!",
        description: "Il proprietario ti contatterà presto per confermare",
      });

      onClose();
      setStep('dates');
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'dates':
        return (
          <div className="space-y-4">
            <div>
              <Label>Date del contratto</Label>
              <p className="text-sm text-muted-foreground mb-4">
                I contratti per studenti sono tipicamente da settembre a maggio/giugno
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data inizio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {moveInDate ? format(moveInDate, "PPP", { locale: it }) : "Seleziona data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={moveInDate}
                        onSelect={setMoveInDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label>Data fine</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {moveOutDate ? format(moveOutDate, "PPP", { locale: it }) : "Seleziona data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={moveOutDate}
                        onSelect={setMoveOutDate}
                        disabled={(date) => !moveInDate || date <= moveInDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div>
              <Label>Piano di pagamento</Label>
              <Select value={paymentPlan} onValueChange={(v) => setPaymentPlan(v as typeof paymentPlan)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">
                    Mensile - €{property.discounted_price_monthly}/mese
                  </SelectItem>
                  <SelectItem value="semester">
                    Semestrale - €{(property.discounted_price_monthly * 6 * 0.95).toFixed(0)} (5% sconto)
                  </SelectItem>
                  <SelectItem value="annual">
                    Annuale - €{(property.discounted_price_monthly * 12 * 0.9).toFixed(0)} (10% sconto)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {moveInDate && moveOutDate && (
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Totale stimato</p>
                <p className="text-2xl font-bold text-primary">€{calculateTotal().toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  + €{property.deposit_amount || property.discounted_price_monthly * 2} di cauzione
                </p>
              </div>
            )}

            <Button 
              className="w-full" 
              onClick={() => setStep('personal')}
              disabled={!moveInDate || !moveOutDate}
            >
              Continua
            </Button>
          </div>
        );

      case 'personal':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <Label>Cognome</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label>Telefono</Label>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <Label>Università</Label>
              <Input value={university} onChange={(e) => setUniversity(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('dates')}>
                Indietro
              </Button>
              <Button 
                className="flex-1" 
                onClick={() => setStep('documents')}
                disabled={!firstName || !lastName || !email || !phone || !university}
              >
                Continua
              </Button>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              I seguenti documenti saranno richiesti durante il processo di verifica:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Documento d'identità</p>
                  <p className="text-sm text-muted-foreground">Carta d'identità o passaporto</p>
                </div>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Certificato di iscrizione</p>
                  <p className="text-sm text-muted-foreground">Attestato universitario</p>
                </div>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Prova di reddito (opzionale)</p>
                  <p className="text-sm text-muted-foreground">Per accelerare l'approvazione</p>
                </div>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Potrai caricare questi documenti dopo l'invio della richiesta nella tua dashboard
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('personal')}>
                Indietro
              </Button>
              <Button className="flex-1" onClick={() => setStep('payment')}>
                Continua
              </Button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h4 className="font-semibold">Riepilogo</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Proprietà</span>
                  <span className="font-medium">{property.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium">{moveInDate && format(moveInDate, "PPP", { locale: it })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium">{moveOutDate && format(moveOutDate, "PPP", { locale: it })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Piano</span>
                  <span className="font-medium capitalize">{paymentPlan}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold">Totale</span>
                  <span className="font-bold text-primary">€{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg">
              <CreditCard className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Nessun pagamento ora</p>
                <p className="text-xs text-muted-foreground">
                  Il pagamento sarà richiesto solo dopo l'approvazione del proprietario
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('documents')}>
                Indietro
              </Button>
              <Button 
                className="flex-1" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Invio...' : 'Invia richiesta'}
              </Button>
            </div>
          </div>
        );
    }
  };

  const steps = [
    { key: 'dates', label: 'Date' },
    { key: 'personal', label: 'Dati' },
    { key: 'documents', label: 'Documenti' },
    { key: 'payment', label: 'Conferma' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-lg border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl">Prenota {property.title}</DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((s, idx) => (
              <div key={s.key} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                  s.key === step ? 'bg-primary text-primary-foreground' : 
                  steps.findIndex(st => st.key === step) > idx ? 'bg-primary/20 text-primary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {idx + 1}
                </div>
                <span className="text-xs ml-2 hidden sm:inline">{s.label}</span>
                {idx < steps.length - 1 && <div className="flex-1 h-0.5 bg-muted mx-2" />}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="mt-6">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
