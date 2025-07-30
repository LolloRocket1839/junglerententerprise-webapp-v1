import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Home, MessageCircle, User, Bell } from 'lucide-react';

export function StudentDashboard() {
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
            Ciao, {profile.first_name || 'Studente'}!
          </h1>
          <p className="text-muted-foreground">
            Benvenuto nella tua dashboard studente
          </p>
        </div>
        <Badge variant={profile.kyc_status === 'approved' ? 'default' : 'secondary'}>
          <User className="w-4 h-4 mr-1" />
          {profile.kyc_status === 'approved' ? 'Verificato' : 'Da verificare'}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ricerche Salvate
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Case che ti interessano
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Candidature Inviate
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              In attesa di risposta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Match Coinquilini
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Coinquilini compatibili
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Trova Casa
            </CardTitle>
            <CardDescription>
              Cerca la tua casa ideale o coinquilini compatibili
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="default">
              Cerca Stanze
            </Button>
            <Button className="w-full" variant="outline">
              Trova Coinquilini
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
              Completa il tuo profilo per migliori match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.kyc_status !== 'approved' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-yellow-800">
                  <Bell className="h-4 w-4" />
                  Completa la verifica per accedere a tutte le funzioni
                </div>
              </div>
            )}
            <Button className="w-full" variant="outline">
              Modifica Profilo
            </Button>
            <Button className="w-full" variant="outline">
              Carica Documenti
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Case Consigliate</CardTitle>
          <CardDescription>
            Basate sulle tue preferenze e ricerche
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nessuna casa consigliata al momento</p>
            <p className="text-sm">Completa il tuo profilo per ricevere suggerimenti personalizzati</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}