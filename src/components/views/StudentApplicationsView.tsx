import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  MapPin,
  Euro,
  Calendar,
  Upload,
  Eye
} from "lucide-react";
import { applications, properties } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusConfig = {
  pending: {
    label: "In attesa",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    progress: 20,
  },
  reviewing: {
    label: "In revisione",
    color: "bg-blue-100 text-blue-800",
    icon: Eye,
    progress: 50,
  },
  approved: {
    label: "Approvata",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle2,
    progress: 100,
  },
  signed: {
    label: "Contratto firmato",
    color: "bg-purple-100 text-purple-800",
    icon: FileText,
    progress: 100,
  },
  deposit_paid: {
    label: "Deposito pagato",
    color: "bg-emerald-100 text-emerald-800",
    icon: CheckCircle2,
    progress: 100,
  },
  rejected: {
    label: "Rifiutata",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
    progress: 0,
  },
};

export function StudentApplicationsView() {
  const getProperty = (propertyId: number) => 
    properties.find(p => p.id === propertyId);

  const activeApplications = applications.filter(
    a => !["rejected", "deposit_paid"].includes(a.status)
  );
  const pastApplications = applications.filter(
    a => ["rejected", "deposit_paid"].includes(a.status)
  );

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-primary/10 rounded-xl">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Le Mie Candidature</h1>
          <p className="text-muted-foreground">Monitora lo stato delle tue richieste</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{applications.length}</p>
            <p className="text-sm text-muted-foreground">Totale candidature</p>
          </CardContent>
        </Card>
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {applications.filter(a => a.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">In attesa</p>
          </CardContent>
        </Card>
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-600">
              {applications.filter(a => a.status === "reviewing").length}
            </p>
            <p className="text-sm text-muted-foreground">In revisione</p>
          </CardContent>
        </Card>
        <Card className="jungle-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">
              {applications.filter(a => ["approved", "signed", "deposit_paid"].includes(a.status)).length}
            </p>
            <p className="text-sm text-muted-foreground">Approvate</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Applications */}
      <h2 className="text-lg font-semibold mb-4">Candidature Attive</h2>
      {activeApplications.length === 0 ? (
        <Card className="jungle-card mb-8">
          <CardContent className="py-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nessuna candidatura attiva</h3>
            <p className="text-muted-foreground mb-4">
              Inizia a cercare un alloggio e invia la tua prima candidatura
            </p>
            <Button>Cerca alloggio</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 mb-8">
          {activeApplications.map((application) => {
            const property = getProperty(application.propertyId);
            const status = statusConfig[application.status];
            const StatusIcon = status.icon;

            return (
              <Card key={application.id} className="jungle-card">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{property?.name}</h3>
                        <Badge className={status.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {property?.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Euro className="h-4 w-4" />
                          €{property?.monthlyRate}/mese
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Data trasferimento: {application.moveInDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Dettagli
                      </Button>
                      {application.status === "approved" && (
                        <Button size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Firma contratto
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress tracker */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                      <span>Progresso candidatura</span>
                      <span>{status.progress}%</span>
                    </div>
                    <Progress value={status.progress} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Inviata</span>
                      <span className="text-xs text-muted-foreground">Revisione</span>
                      <span className="text-xs text-muted-foreground">Approvazione</span>
                      <span className="text-xs text-muted-foreground">Contratto</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Required Documents */}
      <Card className="jungle-card mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Documenti Richiesti</CardTitle>
          <CardDescription>Carica i documenti necessari per le tue candidature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Documento d'identità", uploaded: true },
              { name: "Codice fiscale", uploaded: true },
              { name: "Attestato universitario", uploaded: false },
              { name: "Referenze precedenti", uploaded: false },
            ].map((doc, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border",
                  doc.uploaded ? "border-green-200 bg-green-50" : "border-dashed"
                )}
              >
                <div className="flex items-center gap-3">
                  {doc.uploaded ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={doc.uploaded ? "text-green-800" : ""}>{doc.name}</span>
                </div>
                <Button variant={doc.uploaded ? "ghost" : "outline"} size="sm">
                  {doc.uploaded ? "Modifica" : (
                    <>
                      <Upload className="h-4 w-4 mr-1" />
                      Carica
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Applications */}
      {pastApplications.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-4">Storico Candidature</h2>
          <div className="space-y-3">
            {pastApplications.map((application) => {
              const property = getProperty(application.propertyId);
              const status = statusConfig[application.status];
              
              return (
                <Card key={application.id} className="jungle-card opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{property?.name}</h3>
                        <p className="text-sm text-muted-foreground">{property?.address}</p>
                      </div>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
