
import { Building2, GraduationCap, Palmtree, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { UserRole, UserRoleOption } from '@/types/auth';
import { useLanguage } from '@/contexts/LanguageContext';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
  selectedRole?: UserRole;
}

export function RoleSelection({ onRoleSelect, selectedRole }: RoleSelectionProps) {
  const { t } = useLanguage();
  
  const roleOptions: UserRoleOption[] = [
    {
      id: 'student',
      title: t('student'),
      description: t('studentDesc'),
      icon: 'GraduationCap'
    },
    {
      id: 'tourist',
      title: t('tourist'),
      description: t('touristDesc'),
      icon: 'Palmtree'
    },
    {
      id: 'investor',
      title: t('investor'),
      description: t('investorDesc'),
      icon: 'Building2'
    }
  ];
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
