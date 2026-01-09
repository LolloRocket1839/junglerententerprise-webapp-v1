export function JungleFooter() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
          <div className="flex items-center gap-2">
              <img 
                src="/jungle-rent-logo.svg" 
                alt="Jungle Rent" 
                className="h-8 w-auto"
              />
              <span className="font-serif font-bold text-xl text-foreground">
                Jungle Rent
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Investimenti immobiliari innovativi per studenti universitari a Torino.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Per Investitori</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Come Funziona</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Rendimenti</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Per Studenti</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Cerca Alloggio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sconto 25%</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Supporto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Partner</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>2i3T - Incubatore Imprese</li>
              <li>Università di Torino</li>
              <li>Politecnico di Torino</li>
              <li>ESCP Business School</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Jungle Rent SRL. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Termini di Servizio</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
