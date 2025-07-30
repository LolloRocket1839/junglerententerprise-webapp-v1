import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Palmtree, Calendar, MapPin, Star, Search, User, Bell } from 'lucide-react';

export function TouristDashboard() {
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
            Ciao, {profile.first_name || 'Viaggiatore'}!
          </h1>
          <p className="text-muted-foreground">
            Scopri alloggi unici per i tuoi viaggi
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
              Prenotazioni Attive
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Viaggi programmati
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Destinazioni Visitate
            </CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Città esplorate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recensioni Scritte
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Esperienze condivise
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Preferiti Salvati
            </CardTitle>
            <Palmtree className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Alloggi nella wishlist
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Trova il Tuo Alloggio
            </CardTitle>
            <CardDescription>
              Cerca alloggi unici per le tue vacanze
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="default">
              <Search className="h-4 w-4 mr-2" />
              Cerca Alloggi
            </Button>
            <Button className="w-full" variant="outline">
              Offerte Last Minute
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Il Tuo Profilo
            </CardTitle>
            <CardDescription>
              Personalizza la tua esperienza di viaggio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.kyc_status !== 'approved' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-yellow-800">
                  <Bell className="h-4 w-4" />
                  Verifica il profilo per prenotazioni più veloci
                </div>
              </div>
            )}
            <Button className="w-full" variant="outline">
              Modifica Profilo
            </Button>
            <Button className="w-full" variant="outline">
              Preferenze di Viaggio
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Le Tue Prenotazioni</CardTitle>
          <CardDescription>
            Gestisci i tuoi viaggi passati e futuri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna prenotazione attiva</p>
            <p className="text-sm">Le tue prenotazioni appariranno qui una volta effettuate</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Destinazioni Consigliate</CardTitle>
          <CardDescription>
            Scopri luoghi incredibili basati sui tuoi interessi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Suggerimenti personalizzati in arrivo</p>
            <p className="text-sm">Completa il tuo profilo per ricevere raccomandazioni su misura</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recensioni e Feedback</CardTitle>
          <CardDescription>
            Condividi le tue esperienze di viaggio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna recensione scritta</p>
            <p className="text-sm">Aiuta altri viaggiatori condividendo le tue esperienze</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}