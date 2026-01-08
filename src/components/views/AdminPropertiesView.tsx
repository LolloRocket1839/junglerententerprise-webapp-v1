import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAdminProperties, useUpdatePropertyStatus } from "@/hooks/useAdminProperties";
import { Building2, Search, MapPin, Euro, Bed, Bath, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function AdminPropertiesView() {
  const { data: properties, isLoading } = useAdminProperties();
  const updateStatus = useUpdatePropertyStatus();
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [modeFilter, setModeFilter] = useState<string>("all");

  const cities = [...new Set(properties?.map(p => p.city) || [])];

  const filteredProperties = properties?.filter(p => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase()) ||
                         p.address?.toLowerCase().includes(search.toLowerCase());
    const matchesCity = cityFilter === "all" || p.city === cityFilter;
    const matchesMode = modeFilter === "all" || p.usage_mode === modeFilter;
    return matchesSearch && matchesCity && matchesMode;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      available: "default",
      rented: "secondary",
      maintenance: "outline",
      inactive: "destructive"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const getModeLabel = (mode: string) => {
    const labels: Record<string, string> = {
      student_only: "🎓 Studenti",
      tourist_only: "✈️ Turisti",
      hybrid: "🔄 Ibrido"
    };
    return labels[mode] || mode;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            Gestione Proprietà
            <Badge variant="outline" className="ml-2">{properties?.length || 0} totali</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cerca per nome o indirizzo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Città" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le città</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Modalità" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte</SelectItem>
                <SelectItem value="student_only">Studenti</SelectItem>
                <SelectItem value="tourist_only">Turisti</SelectItem>
                <SelectItem value="hybrid">Ibrido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Proprietà</TableHead>
                  <TableHead>Città</TableHead>
                  <TableHead>Modalità</TableHead>
                  <TableHead>Prezzi</TableHead>
                  <TableHead>Caratteristiche</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties?.map((property) => (
                  <TableRow key={property.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="font-medium">{property.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.address}
                      </div>
                    </TableCell>
                    <TableCell>{property.city}</TableCell>
                    <TableCell>{getModeLabel(property.usage_mode)}</TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {property.student_price_monthly && (
                          <div className="flex items-center gap-1">
                            <Euro className="h-3 w-3" />
                            {property.student_price_monthly}/mese
                          </div>
                        )}
                        {property.tourist_price_nightly && (
                          <div className="flex items-center gap-1">
                            <Euro className="h-3 w-3" />
                            {property.tourist_price_nightly}/notte
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {property.rooms || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3 w-3" />
                          {property.bathrooms || 0}
                        </span>
                        <span>{property.size_sqm || 0}m²</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(property.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: property.id, status: 'available' })}>
                            ✅ Disponibile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: property.id, status: 'rented' })}>
                            🔒 Affittato
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: property.id, status: 'maintenance' })}>
                            🔧 Manutenzione
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus.mutate({ id: property.id, status: 'inactive' })}>
                            ❌ Inattivo
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProperties?.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nessuna proprietà trovata</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
