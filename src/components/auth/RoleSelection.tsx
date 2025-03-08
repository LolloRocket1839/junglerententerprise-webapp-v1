
import { Building2, GraduationCap, Palmtree, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { UserRole, UserRoleOption } from '@/types/auth';

const roleOptions: UserRoleOption[] = [
  {
    id: 'student',
    title: 'Studente',
    description: 'Cerca alloggi a lungo termine con sconti studenti',
    icon: 'GraduationCap'
  },
  {
    id: 'tourist',
    title: 'Turista',
    description: 'Prenota soggiorni brevi in appartamenti',
    icon: 'Palmtree'
  },
  {
    id: 'investor',
    title: 'Investitore',
    description: 'Gestisci proprietà e analizza rendimenti',
    icon: 'Building2'
  }
];

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
  selectedRole?: UserRole;
}

export function RoleSelection({ onRoleSelect, selectedRole }: RoleSelectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {roleOptions.map((option) => (
        <Card
          key={option.id}
          className={`p-4 cursor-pointer transition-all hover:scale-105 ${
            selectedRole === option.id ? 'border-primary' : 'border-border'
          }`}
          onClick={() => onRoleSelect(option.id)}
        >
          <div className="flex flex-col items-center text-center gap-2">
            {option.icon === 'GraduationCap' && <GraduationCap className="w-8 h-8" />}
            {option.icon === 'Palmtree' && <Palmtree className="w-8 h-8" />}
            {option.icon === 'Building2' && <Building2 className="w-8 h-8" />}
            <h3 className="font-semibold">{option.title}</h3>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
