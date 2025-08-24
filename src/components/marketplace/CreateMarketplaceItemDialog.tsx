import React, { useState } from 'react';
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
import { MarketplaceCategory } from './types';
import { useStorageUpload } from '@/hooks/useStorageUpload';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { Progress } from '@/components/ui/progress';
import { Plus, Upload, X } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, "Nome richiesto"),
  description: z.string().min(10, "Descrizione di almeno 10 caratteri"),
  category: z.enum(['furniture', 'electronics', 'textbooks', 'services', 'swap'] as const),
  price: z.number().min(0, "Prezzo deve essere positivo").optional(),
  lookingFor: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface CreateMarketplaceItemDialogProps {
  onItemCreated?: () => void;
}

const CreateMarketplaceItemDialog = ({ onItemCreated }: CreateMarketplaceItemDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();

  const { uploadSingleFile, uploading, validateFile } = useStorageUpload(
    'marketplace-images',
    undefined,
    { maxSizeMB: 3, maxDimension: 1200 }
  );

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "furniture",
      price: 0,
      lookingFor: "",
    },
  });

  const category = form.watch('category');

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        toast({
          title: "File non valido",
          description: error,
          variant: "destructive"
        });
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const result = await uploadSingleFile(file);
    if (!result.success || !result.publicUrl) {
      throw new Error(result.error || 'Upload fallito');
    }
    return result.publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    if (!session?.user) {
      toast({
        title: "Errore",
        description: "Devi essere loggato per creare un annuncio",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = '';
      
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      const itemData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.category === 'swap' ? 0 : (data.price || 0),
        image_url: imageUrl,
        seller_id: session.user.id,
        ...(data.category === 'swap' && data.lookingFor && { looking_for: data.lookingFor })
      };

      const { error } = await supabase
        .from('marketplace_items')
        .insert([itemData]);

      if (error) throw error;

      toast({
        title: "Successo!",
        description: "Annuncio creato con successo",
      });

      form.reset();
      setSelectedImage(null);
      setImagePreview(null);
      setIsOpen(false);
      onItemCreated?.();

    } catch (error) {
      console.error('Error creating item:', error);
      toast({
        title: "Errore",
        description: "Errore nella creazione dell'annuncio",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    { value: 'furniture', label: 'Arredamento' },
    { value: 'electronics', label: 'Elettronica' },
    { value: 'textbooks', label: 'Libri' },
    { value: 'services', label: 'Servizi' },
    { value: 'swap', label: 'Scambio' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="glass-button flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Crea Annuncio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black/90 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Crea Nuovo Annuncio</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Immagine</label>
              {!imagePreview ? (
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-white/40 mb-4" />
                  <p className="text-white/60 mb-4">Seleziona un'immagine</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    disabled={uploading}
                  >
                    Scegli File
                  </Button>
                  <p className="text-xs text-white/60 mt-2">
                    Max 3MB. Supportati: JPEG, PNG, WebP
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <ImageWithFallback
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="glass-input"
                      placeholder="Es. Scrivania da studio"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Seleziona categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {category !== 'swap' && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Prezzo {category === 'services' ? '(€/ora)' : '(€)'}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="glass-input"
                        placeholder="0"
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {category === 'swap' && (
              <FormField
                control={form.control}
                name="lookingFor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Cosa cerchi in cambio?</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="glass-input"
                        placeholder="Es. Tastiera meccanica"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Descrizione</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="glass-input min-h-[100px]"
                      placeholder="Descrivi il tuo annuncio..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Annulla
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || uploading}
                className="flex-1 glass-button"
              >
                {isSubmitting ? "Creando..." : 
                 uploading ? "Caricando immagine..." : "Crea Annuncio"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMarketplaceItemDialog;