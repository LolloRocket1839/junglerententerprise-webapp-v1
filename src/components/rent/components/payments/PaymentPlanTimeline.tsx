
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Euro, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PaymentSchedule, PaymentStatus } from "../../types/documents";
import { GlassCard } from "@/components/ui/glass-card";

export function PaymentPlanTimeline() {
  const [payments, setPayments] = useState<PaymentSchedule[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    const { data, error } = await supabase
      .from('payment_schedules')
      .select(`
        *,
        rental_contracts(*)
      `)
      .order('due_date', { ascending: true });

    if (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare il piano pagamenti",
        variant: "destructive"
      });
      return;
    }

    // Map database fields to our frontend types ensuring status is the correct type
    const mappedPayments: PaymentSchedule[] = data.map(payment => ({
      id: payment.id,
      dueDate: payment.due_date,
      amount: payment.amount,
      status: payment.status as PaymentStatus, // Cast to our union type
      isExempt: payment.is_exempt,
      exemptionReason: payment.exemption_reason
    }));

    setPayments(mappedPayments);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Piano Pagamenti
      </h2>
      
      <div className="space-y-4">
        {payments.map((payment) => (
          <GlassCard 
            key={payment.id}
            className={`
              relative overflow-hidden
              ${payment.isExempt ? 'opacity-50' : ''}
              ${payment.status === 'paid' ? 'border-green-500/30' : ''}
              ${payment.status === 'overdue' ? 'border-red-500/30' : ''}
            `}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-white/70" />
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {format(new Date(payment.dueDate), 'MMMM yyyy', { locale: it })}
                  </h3>
                  <p className="text-xs text-white/70">
                    {payment.isExempt ? 'Mese Esente' : `Scadenza: ${format(new Date(payment.dueDate), 'd MMMM', { locale: it })}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Euro className="h-4 w-4 text-white/70" />
                <span className="text-lg font-semibold text-white">
                  {payment.amount.toFixed(2)}
                </span>
              </div>
            </div>

            {payment.isExempt && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="text-sm text-white/90">
                  {payment.exemptionReason || 'Periodo Esente'}
                </span>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
