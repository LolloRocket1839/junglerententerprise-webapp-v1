import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Upload, X, Edit, Trash2 } from 'lucide-react';
import { Card } from "@/components/ui/card";

const propertySchema = z.object({
  title: z.string().min(1, "Titolo richiesto"),
  description: z.string().min(10, "Descrizione di almeno 10 caratteri"),
  address: z.string().min(1, "Indirizzo richiesto"),
  city: z.string().min(1, "Città richiesta"),
  postal_code: z.string().optional(),
  market_price_monthly: z.number().min(1, "Prezzo richiesto"),
  discounted_price_monthly: z.number().optional(),
  size_sqm: z.number().min(1, "Dimensione richiesta"),
  rooms: z.number().min(1, "Numero stanze richiesto"),
  bathrooms: z.number().min(1, "Numero bagni richiesto"),
  has_kitchen: z.boolean().default(false),
  has_living_room: z.boolean().default(false),
  has_balcony: z.boolean().default(false),
  is_furnished: z.boolean().default(false),
  internet_available: z.boolean().default(false),
  utilities_included: z.boolean().default(false),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyManagerProps {
  onPropertyChange?: () => void;
}

const PropertyManager = ({ onPropertyChange }: PropertyManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const { session } = useAuth();
  const { toast } = useToast();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      postal_code: "",
      market_price_monthly: 0,
      discounted_price_monthly: 0,
      size_sqm: 0,
      rooms: 1,
      bathrooms: 1,
      has_kitchen: false,
      has_living_room: false,
      has_balcony: false,
      is_furnished: false,
      internet_available: false,
      utilities_included: false,
    },
  });

  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('student_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error loading properties:', error);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(data.path);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: PropertyFormData) => {
    if (!session?.user) {
      toast({
        title: "Errore",
        description: "Devi essere loggato per gestire le proprietà",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrls: string[] = [];
      
      if (selectedImages.length > 0) {
        imageUrls = await uploadImages(selectedImages);
      }

      const propertyData = {
        title: data.title,
        description: data.description,
        address: data.address,
        city: data.city,
        postal_code: data.postal_code || '',
        market_price_monthly: data.market_price_monthly,
        discounted_price_monthly: data.discounted_price_monthly || data.market_price_monthly,
        discount_percentage: data.discounted_price_monthly 
          ? Math.round(((data.market_price_monthly - data.discounted_price_monthly) / data.market_price_monthly) * 100)
          : 0,
        size_sqm: data.size_sqm,
        rooms: data.rooms,
        bathrooms: data.bathrooms,
        has_kitchen: data.has_kitchen,
        has_living_room: data.has_living_room,
        has_balcony: data.has_balcony,
        is_furnished: data.is_furnished,
        internet_available: data.internet_available,
        utilities_included: data.utilities_included,
        images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'],
        availability_start: new Date().toISOString(),
        current_status: 'available' as const,
      };

      if (editingProperty) {
        const { error } = await supabase
          .from('student_properties')
          .update(propertyData)
          .eq('id', editingProperty.id);

        if (error) throw error;

        toast({
          title: "Successo!",
          description: "Proprietà aggiornata con successo",
        });
      } else {
        const { error } = await supabase
          .from('student_properties')
          .insert(propertyData);

        if (error) throw error;

        toast({
          title: "Successo!",
          description: "Proprietà creata con successo",
        });
      }

      form.reset();
      setSelectedImages([]);
      setImagePreviews([]);
      setIsOpen(false);
      setEditingProperty(null);
      loadProperties();
      onPropertyChange?.();

    } catch (error) {
      console.error('Error managing property:', error);
      toast({
        title: "Errore",
        description: "Errore nella gestione della proprietà",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (property: any) => {
    setEditingProperty(property);
    form.reset({
      title: property.title,
      description: property.description,
      address: property.address,
      city: property.city,
      postal_code: property.postal_code || '',
      market_price_monthly: property.market_price_monthly,
      discounted_price_monthly: property.discounted_price_monthly || 0,
      size_sqm: property.size_sqm,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      has_kitchen: property.has_kitchen,
      has_living_room: property.has_living_room,
      has_balcony: property.has_balcony,
      is_furnished: property.is_furnished,
      internet_available: property.internet_available,
      utilities_included: property.utilities_included,
    });
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa proprietà?')) return;

    try {
      const { error } = await supabase
        .from('student_properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Successo!",
        description: "Proprietà eliminata con successo",
      });

      loadProperties();
      onPropertyChange?.();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: "Errore",
        description: "Errore nell'eliminazione della proprietà",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestione Proprietà</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="glass-button flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Aggiungi Proprietà
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] bg-black/90 border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">
                {editingProperty ? 'Modifica Proprietà' : 'Aggiungi Nuova Proprietà'}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Immagini</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Seleziona Immagini
                    </Button>
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 p-1 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Titolo</FormLabel>
                        <FormControl>
                          <Input {...field} className="glass-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Città</FormLabel>
                        <FormControl>
                          <Input {...field} className="glass-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Indirizzo</FormLabel>
                      <FormControl>
                        <Input {...field} className="glass-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Descrizione</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="glass-input min-h-[100px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="market_price_monthly"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Prezzo (€/mese)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="glass-input"
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discounted_price_monthly"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Prezzo Scontato</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="glass-input"
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="size_sqm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Dimensione (m²)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="glass-input"
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Stanze</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="glass-input"
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Checkboxes */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { name: 'has_kitchen', label: 'Cucina' },
                    { name: 'has_living_room', label: 'Soggiorno' },
                    { name: 'has_balcony', label: 'Balcone' },
                    { name: 'is_furnished', label: 'Arredato' },
                    { name: 'internet_available', label: 'Internet' },
                    { name: 'utilities_included', label: 'Utenze Incluse' },
                  ].map((checkbox) => (
                    <FormField
                      key={checkbox.name}
                      control={form.control}
                      name={checkbox.name as keyof PropertyFormData}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-white text-sm">{checkbox.label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                      setEditingProperty(null);
                      form.reset();
                      setSelectedImages([]);
                      setImagePreviews([]);
                    }}
                    className="flex-1"
                  >
                    Annulla
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 glass-button"
                  >
                    {isSubmitting ? "Salvando..." : (editingProperty ? "Aggiorna" : "Crea Proprietà")}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

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
            <h3 className="text-white font-semibold mb-2">{property.title}</h3>
            <p className="text-white/60 text-sm mb-2">{property.address}, {property.city}</p>
            <p className="text-white font-bold mb-3">€{property.market_price_monthly}/mese</p>
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
    </div>
  );
};

export default PropertyManager;