import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface DealflowSubmission {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  propertyAddress: string;
  propertyCity: string;
  propertyPostalCode?: string;
  propertyType: 'apartment' | 'house' | 'studio' | 'room' | 'commercial';
  sizeSqm?: number;
  rooms?: number;
  bathrooms?: number;
  floorNumber?: number;
  askingPrice: number;
  currentRentalIncome?: number;
  estimatedValue?: number;
  description: string;
  uniqueSellingPoints?: string;
  images?: string[];
  documents?: string[];
}

export function useDealflowSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const submitProperty = async (data: DealflowSubmission) => {
    setIsSubmitting(true);
    try {
      // Get current user (if authenticated)
      const { data: { user } } = await supabase.auth.getUser();

      // Insert into property_dealflow table
      const { data: submission, error } = await (supabase as any)
        .from('property_dealflow')
        .insert({
          submitter_id: user?.id || null,
          contact_name: data.contactName,
          contact_email: data.contactEmail,
          contact_phone: data.contactPhone,
          property_address: data.propertyAddress,
          property_city: data.propertyCity,
          property_postal_code: data.propertyPostalCode,
          property_type: data.propertyType,
          size_sqm: data.sizeSqm,
          rooms: data.rooms,
          bathrooms: data.bathrooms,
          floor_number: data.floorNumber,
          asking_price: data.askingPrice,
          current_rental_income: data.currentRentalIncome,
          estimated_value: data.estimatedValue,
          description: data.description,
          unique_selling_points: data.uniqueSellingPoints,
          images: data.images || [],
          documents: data.documents || [],
          status: 'pending',
          priority_level: 'normal'
        })
        .select()
        .single();

      if (error) throw error;

      setSubmissionId(submission.id);
      
      toast({
        title: t('submissionSuccess'),
        description: t('reviewMessage'),
      });

      return { success: true, id: submission.id };
    } catch (error) {
      console.error('Error submitting property:', error);
      toast({
        title: t('errorSubmitting'),
        description: t('pleaseTryAgain'),
        variant: 'destructive',
      });
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('dealflow-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('dealflow-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const uploadDocument = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('dealflow-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('dealflow-documents')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading document:', error);
      return null;
    }
  };

  return {
    submitProperty,
    uploadImage,
    uploadDocument,
    isSubmitting,
    submissionId,
  };
}
