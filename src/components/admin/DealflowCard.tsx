import { useState } from 'react';
import { MapPin, Mail, Phone, Home, Calendar, Euro } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

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

interface DealflowCardProps {
  submission: DealflowSubmission;
  onUpdate: () => void;
}

export function DealflowCard({ submission, onUpdate }: DealflowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(submission.status);
  const [notes, setNotes] = useState(submission.admin_notes || '');
  const { toast } = useToast();
  const { t } = useLanguage();

  const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    reviewing: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    interested: 'bg-green-500/20 text-green-300 border-green-500/30',
    negotiating: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    rejected: 'bg-red-500/20 text-red-300 border-red-500/30',
    acquired: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  };

  const priorityColors = {
    low: 'bg-gray-500/20 text-gray-300',
    normal: 'bg-blue-500/20 text-blue-300',
    high: 'bg-orange-500/20 text-orange-300',
    urgent: 'bg-red-500/20 text-red-300',
  };

  const handleUpdate = async () => {
    try {
      const { error } = await (supabase as any)
        .from('property_dealflow')
        .update({
          status,
          admin_notes: notes,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', submission.id);

      if (error) throw error;

      toast({
        title: t('success'),
        description: 'Dealflow updated successfully',
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating dealflow:', error);
      toast({
        title: t('error'),
        description: 'Failed to update dealflow',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {submission.property_address}
          </h3>
          <div className="flex gap-2 mb-2">
            <Badge className={statusColors[submission.status as keyof typeof statusColors]}>
              {t(submission.status)}
            </Badge>
            <Badge className={priorityColors[submission.priority_level as keyof typeof priorityColors]}>
              {t(submission.priority_level)}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            €{submission.asking_price.toLocaleString()}
          </p>
          <p className="text-sm text-white/60">
            {new Date(submission.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-white/80">
          <MapPin size={16} />
          <span>{submission.property_city}</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Home size={16} />
          <span>{t(submission.property_type)}</span>
        </div>
        {submission.size_sqm && (
          <div className="flex items-center gap-2 text-white/80">
            <span>{submission.size_sqm}m²</span>
            {submission.rooms && <span>• {submission.rooms} rooms</span>}
          </div>
        )}
        {submission.current_rental_income && (
          <div className="flex items-center gap-2 text-white/80">
            <Euro size={16} />
            <span>€{submission.current_rental_income}/month rental</span>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 pt-4 mb-4">
        <p className="text-white/80 mb-2">
          <strong className="text-white">{t('contact')}:</strong> {submission.contact_name}
        </p>
        <div className="flex gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <a href={`mailto:${submission.contact_email}`} className="hover:text-primary">
              {submission.contact_email}
            </a>
          </div>
          {submission.contact_phone && (
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <a href={`tel:${submission.contact_phone}`} className="hover:text-primary">
                {submission.contact_phone}
              </a>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 border-t border-white/10 pt-4">
          <div>
            <h4 className="text-white font-semibold mb-2">{t('description')}</h4>
            <p className="text-white/80">{submission.description}</p>
          </div>

          {submission.unique_selling_points && (
            <div>
              <h4 className="text-white font-semibold mb-2">{t('uniqueSellingPoints')}</h4>
              <p className="text-white/80">{submission.unique_selling_points}</p>
            </div>
          )}

          {submission.images && submission.images.length > 0 && (
            <div>
              <h4 className="text-white font-semibold mb-2">{t('images')} ({submission.images.length})</h4>
              <div className="grid grid-cols-4 gap-2">
                {submission.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {submission.documents && submission.documents.length > 0 && (
            <div>
              <h4 className="text-white font-semibold mb-2">{t('documents')} ({submission.documents.length})</h4>
              <div className="space-y-1">
                {submission.documents.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline block"
                  >
                    Document {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {isEditing ? (
            <div className="space-y-4 bg-white/5 p-4 rounded">
              <div>
                <label className="text-white mb-2 block">{t('changeStatus')}</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">{t('pending')}</SelectItem>
                    <SelectItem value="reviewing">{t('reviewing')}</SelectItem>
                    <SelectItem value="interested">{t('interested')}</SelectItem>
                    <SelectItem value="negotiating">{t('negotiating')}</SelectItem>
                    <SelectItem value="rejected">{t('rejected')}</SelectItem>
                    <SelectItem value="acquired">{t('acquired')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-white mb-2 block">{t('adminNotes')}</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleUpdate} className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" className="border-white/20">
                  {t('cancel')}
                </Button>
              </div>
            </div>
          ) : (
            submission.admin_notes && (
              <div>
                <h4 className="text-white font-semibold mb-2">{t('adminNotes')}</h4>
                <p className="text-white/80 bg-white/5 p-3 rounded">{submission.admin_notes}</p>
              </div>
            )
          )}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="border-white/20"
        >
          {isExpanded ? 'Show Less' : t('viewDetails')}
        </Button>
        {isExpanded && !isEditing && (
          <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
            {t('addNotes')}
          </Button>
        )}
      </div>
    </Card>
  );
}
