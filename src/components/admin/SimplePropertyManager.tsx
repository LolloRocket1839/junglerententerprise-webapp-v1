import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Upload, Edit, Trash2 } from 'lucide-react';

const SimplePropertyManager = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm();

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('student_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error loading properties:', error);
      toast({
        title: "Errore",
        description: "Errore nel caricamento delle proprietà",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const propertyData = {
        title: data.title,
        description: data.description,
        address: data.address,
        city: data.city,
        market_price_monthly: parseFloat(data.price) || 0,
        discounted_price_monthly: parseFloat(data.price) || 0,
        size_sqm: parseFloat(data.size) || 50,
        rooms: parseInt(data.rooms) || 1,
        bathrooms: 1,
        has_kitchen: true,
        has_living_room: true,
        has_balcony: false,
        is_furnished: true,
        internet_available: true,
        utilities_included: true,
        images: [data.image_url || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'],
        availability_start: new Date().toISOString(),
        current_status: 'available' as const,
      };

      if (editingId) {
        const { error } = await supabase
          .from('student_properties')
          .update(propertyData)
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "Successo!", description: "Proprietà aggiornata" });
      } else {
        const { error } = await supabase
          .from('student_properties')
          .insert(propertyData);

        if (error) throw error;
        toast({ title: "Successo!", description: "Proprietà aggiunta" });
      }

      reset();
      setShowForm(false);
      setEditingId(null);
      loadProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      toast({
        title: "Errore",
        description: "Errore nel salvare la proprietà",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (property: any) => {
    setEditingId(property.id);
    setValue('title', property.title);
    setValue('description', property.description);
    setValue('address', property.address);
    setValue('city', property.city);
    setValue('price', property.market_price_monthly);
    setValue('size', property.size_sqm);
    setValue('rooms', property.rooms);
    setValue('image_url', property.images?.[0] || '');
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminare questa proprietà?')) return;

    try {
      const { error } = await supabase
        .from('student_properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Successo!", description: "Proprietà eliminata" });
      loadProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Errore",
        description: "Errore nell'eliminazione",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] flex items-center justify-center">
        <div className="text-white text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1a472a] via-[#2d5a3f] to-[#3d6b52] p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">🏠 Gestione Proprietà</h1>
          <Button 
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              reset();
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {showForm ? 'Chiudi Form' : 'Aggiungi Proprietà'}
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="bg-black/50 border-white/10 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingId ? 'Modifica Proprietà' : 'Nuova Proprietà'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  {...register('title', { required: true })}
                  placeholder="Titolo (es. Appartamento Corso Duca)"
                  className="bg-background/50 border-border text-foreground"
                />
                <Input
                  {...register('city', { required: true })}
                  placeholder="Città (es. Torino)"
                  className="bg-background/50 border-border text-foreground"
                />
              </div>
              
              <Input
                {...register('address', { required: true })}
                placeholder="Indirizzo completo"
                className="bg-background/50 border-border text-foreground"
              />
              
              <Textarea
                {...register('description')}
                placeholder="Descrizione della proprietà..."
                className="bg-background/50 border-border text-foreground min-h-[100px]"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  {...register('price', { required: true })}
                  type="number"
                  placeholder="Prezzo €/mese"
                  className="bg-background/50 border-border text-foreground"
                />
                <Input
                  {...register('size', { required: true })}
                  type="number"
                  placeholder="Dimensione m²"
                  className="bg-background/50 border-border text-foreground"
                />
                <Input
                  {...register('rooms', { required: true })}
                  type="number"
                  placeholder="Numero stanze"
                  className="bg-background/50 border-border text-foreground"
                />
              </div>
              
              <Input
                {...register('image_url')}
                placeholder="URL immagine (opzionale)"
                className="bg-background/50 border-border text-foreground"
              />
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    reset();
                  }}
                  className="flex-1"
                >
                  Annulla
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  {editingId ? 'Aggiorna' : 'Crea'} Proprietà
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Properties List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="bg-black/50 border-white/10 p-4">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                <img
                  src={property.images?.[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'}
                  alt={property.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-white font-semibold mb-2 line-clamp-1">{property.title}</h3>
              <p className="text-white/60 text-sm mb-2 line-clamp-1">
                {property.address}, {property.city}
              </p>
              <p className="text-white font-bold mb-3">€{property.market_price_monthly}/mese</p>
              <p className="text-white/70 text-sm mb-3 line-clamp-2">
                {property.description}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(property)}
                  className="flex-1 text-xs"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Modifica
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(property.id)}
                  className="flex-1 text-xs"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Elimina
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">Nessuna proprietà trovata</p>
            <p className="text-white/40 text-sm mt-2">Clicca "Aggiungi Proprietà" per iniziare</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimplePropertyManager;