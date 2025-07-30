import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, TrendingUp, Euro, PieChart, Plus, User, Bell } from 'lucide-react';

export function InvestorDashboard() {
  const { session } = useAuth();
  const { data: profile } = useProfile();

  if (!session || !profile) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Benvenuto, {profile.first_name || 'Investitore'}!
          </h1>
          <p className="text-muted-foreground">
            Gestisci i tuoi investimenti immobiliari
          </p>
        </div>
        <Badge variant={profile.kyc_status === 'approved' ? 'default' : 'secondary'}>
          <User className="w-4 h-4 mr-1" />
          {profile.kyc_status === 'approved' ? 'Verificato' : 'Da verificare'}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portafoglio Totale
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€0</div>
            <p className="text-xs text-muted-foreground">
              Valore totale investimenti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rendimento Annuo
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">
              ROI medio annuale
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Proprietà Possedute
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Quote SFP attive
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dividendi Mensili
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€0</div>
            <p className="text-xs text-muted-foreground">
              Entrate passive mensili
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Opportunità di Investimento
            </CardTitle>
            <CardDescription>
              Scopri nuove proprietà per diversificare il portafoglio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Esplora Proprietà
            </Button>
            <Button className="w-full" variant="outline">
              Calcola ROI
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Verifica KYC
            </CardTitle>
            <CardDescription>
              Completa la verifica per investire
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.kyc_status !== 'approved' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-yellow-800">
                  <Bell className="h-4 w-4" />
                  Verifica KYC necessaria per investire
                </div>
              </div>
            )}
            <Button 
              className="w-full" 
              variant={profile.kyc_status === 'approved' ? 'outline' : 'default'}
            >
              {profile.kyc_status === 'approved' ? 'Verifica Completata' : 'Inizia Verifica'}
            </Button>
            <Button className="w-full" variant="outline">
              Carica Documenti
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>I Tuoi Investimenti</CardTitle>
          <CardDescription>
            Panoramica delle proprietà nel tuo portafoglio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessun investimento attivo</p>
            <p className="text-sm">Inizia a investire per vedere i tuoi asset qui</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance del Portafoglio</CardTitle>
          <CardDescription>
            Andamento storico dei tuoi investimenti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Dati performance non disponibili</p>
            <p className="text-sm">I grafici appariranno quando avrai investimenti attivi</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}