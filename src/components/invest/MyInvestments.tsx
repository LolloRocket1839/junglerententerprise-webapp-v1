import { useUserInvestments, useInvestmentStats } from "@/hooks/useInvestments";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Coins, TrendingUp, Calendar, LogIn } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export const MyInvestments = () => {
  const { session } = useAuth();
  const { data: investments, isLoading: investmentsLoading } = useUserInvestments();
  const { data: stats, isLoading: statsLoading } = useInvestmentStats();

  // Not logged in state
  if (!session) {
    return (
      <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <LogIn className="h-16 w-16 text-primary/50 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Accedi per vedere i tuoi investimenti
          </h3>
          <p className="text-white/60 mb-6 max-w-md">
            Effettua l'accesso per visualizzare il tuo portfolio e gestire i tuoi investimenti immobiliari.
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Accedi
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (investmentsLoading || statsLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 bg-white/10" />
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-white/10" />
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!investments || investments.length === 0) {
    return (
      <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Building2 className="h-16 w-16 text-primary/50 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nessun investimento ancora
          </h3>
          <p className="text-white/60 mb-6 max-w-md">
            Esplora le opportunità di investimento e inizia a costruire il tuo portfolio immobiliare.
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            Esplora Opportunità
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-white/60">Totale Investito</p>
                <p className="text-xl font-bold text-white">
                  €{stats?.totalInvested.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-white/60">ROI Medio</p>
                <p className="text-xl font-bold text-white">
                  {stats?.averageROI.toFixed(1) || 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Building2 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-white/60">Proprietà</p>
                <p className="text-xl font-bold text-white">
                  {stats?.propertiesCount || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Coins className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-white/60">Token Totali</p>
                <p className="text-xl font-bold text-white">
                  {stats?.totalTokens || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investments List */}
      <Card className="glass-card backdrop-blur-md bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">I Tuoi Investimenti</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              {/* Property Image */}
              <div className="w-full sm:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={investment.property_images[0] || '/placeholder.svg'}
                  alt={investment.property_title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Investment Details */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-white">
                      {investment.property_title}
                    </h4>
                    <p className="text-sm text-white/60">{investment.property_city}</p>
                  </div>
                  <Badge
                    variant={investment.payment_status === 'completed' ? 'default' : 'secondary'}
                    className={
                      investment.payment_status === 'completed'
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }
                  >
                    {investment.payment_status === 'completed' ? 'Completato' : 'In attesa'}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Coins className="h-4 w-4 text-primary" />
                    <span>€{investment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{investment.investor_share_percentage}% ROI</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span>
                      {format(new Date(investment.created_at), 'dd MMM yyyy', { locale: it })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
