import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdminApplications, useUpdateApplicationStatus } from "@/hooks/useAdminApplications";
import { FileText, Building2, Calendar, MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export function AdminApplicationsView() {
  const { data: applications, isLoading } = useAdminApplications();
  const updateStatus = useUpdateApplicationStatus();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredApplications = applications?.filter(app => {
    return statusFilter === "all" || app.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode; label: string }> = {
      approved: { variant: "default", icon: <CheckCircle className="h-3 w-3" />, label: "Approvata" },
      pending: { variant: "outline", icon: <Clock className="h-3 w-3" />, label: "In attesa" },
      rejected: { variant: "destructive", icon: <XCircle className="h-3 w-3" />, label: "Rifiutata" },
      withdrawn: { variant: "secondary", icon: <XCircle className="h-3 w-3" />, label: "Ritirata" }
    };
    const cfg = config[status] || config.pending;
    return (
      <Badge variant={cfg.variant} className="flex items-center gap-1">
        {cfg.icon}
        {cfg.label}
      </Badge>
    );
  };

  const getInitials = (firstName: string | null | undefined, lastName: string | null | undefined) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase() || '??';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const pendingCount = applications?.filter(a => a.status === 'pending').length || 0;

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Candidature Studenti
            <Badge variant="outline" className="ml-2">{applications?.length || 0} totali</Badge>
            {pendingCount > 0 && (
              <Badge variant="destructive" className="ml-2">{pendingCount} in attesa</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Stato candidatura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte</SelectItem>
                <SelectItem value="pending">In attesa</SelectItem>
                <SelectItem value="approved">Approvate</SelectItem>
                <SelectItem value="rejected">Rifiutate</SelectItem>
                <SelectItem value="withdrawn">Ritirate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Studente</TableHead>
                  <TableHead>Proprietà</TableHead>
                  <TableHead>Data Ingresso</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Inviata</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications?.map((app) => (
                  <TableRow key={app.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={Array.isArray(app.student) ? app.student[0]?.avatar_url || undefined : undefined} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(
                              app.first_name || (Array.isArray(app.student) ? app.student[0]?.first_name : null),
                              app.last_name || (Array.isArray(app.student) ? app.student[0]?.last_name : null)
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {app.first_name || (Array.isArray(app.student) ? app.student[0]?.first_name : '')} {app.last_name || (Array.isArray(app.student) ? app.student[0]?.last_name : '')}
                          </div>
                          {app.message && (
                            <div className="text-sm text-muted-foreground line-clamp-1 max-w-[200px]">
                              "{app.message}"
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{app.property?.title || 'N/A'}</div>
                          <div className="text-sm text-muted-foreground">{app.property?.city}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {app.move_in_date ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {format(new Date(app.move_in_date), 'dd MMM yyyy', { locale: it })}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(app.created_at), 'dd MMM yyyy', { locale: it })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => updateStatus.mutate({ id: app.id, status: 'approved' })}
                            className="text-green-600"
                          >
                            ✅ Approva
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateStatus.mutate({ id: app.id, status: 'rejected', admin_notes: 'Rifiutata da admin' })}
                            className="text-red-600"
                          >
                            ❌ Rifiuta
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredApplications?.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nessuna candidatura trovata</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
