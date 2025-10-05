import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DealflowCard } from './DealflowCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

interface DealflowSubmission {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  property_address: string;
  property_city: string;
  property_type: string;
  size_sqm?: number;
  rooms?: number;
  bathrooms?: number;
  asking_price: number;
  current_rental_income?: number;
  description: string;
  unique_selling_points?: string;
  status: string;
  priority_level: string;
  admin_notes?: string;
  images?: string[];
  documents?: string[];
  created_at: string;
}

export function DealflowManager() {
  const [submissions, setSubmissions] = useState<DealflowSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<DealflowSubmission[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('property_dealflow')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching dealflow submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredSubmissions(submissions);
    } else {
      setFilteredSubmissions(
        submissions.filter(sub => sub.status === statusFilter)
      );
    }
  }, [statusFilter, submissions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">{t('dealflowManagement')}</h2>
          <p className="text-white/60">
            {t('allSubmissions')}: {submissions.length}
          </p>
        </div>

        <div className="w-64">
          <label className="text-white text-sm mb-2 block">{t('filterByStatus')}</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatuses')}</SelectItem>
              <SelectItem value="pending">{t('pending')}</SelectItem>
              <SelectItem value="reviewing">{t('reviewing')}</SelectItem>
              <SelectItem value="interested">{t('interested')}</SelectItem>
              <SelectItem value="negotiating">{t('negotiating')}</SelectItem>
              <SelectItem value="rejected">{t('rejected')}</SelectItem>
              <SelectItem value="acquired">{t('acquired')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="text-center py-12 text-white/60">
          <p>{t('noSubmissions')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <DealflowCard
              key={submission.id}
              submission={submission}
              onUpdate={fetchSubmissions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
