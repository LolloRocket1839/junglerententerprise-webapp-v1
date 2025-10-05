import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Upload, CheckCircle, Zap, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDealflowSubmit } from '@/hooks/useDealflowSubmit';

const formSchema = z.object({
  contactName: z.string().min(2, 'requiredField'),
  contactEmail: z.string().email('invalidEmail'),
  contactPhone: z.string().optional(),
  propertyAddress: z.string().min(5, 'requiredField'),
  propertyCity: z.string().min(2, 'requiredField'),
  propertyPostalCode: z.string().optional(),
  propertyType: z.enum(['apartment', 'house', 'studio', 'room', 'commercial']),
  sizeSqm: z.number().optional(),
  rooms: z.number().optional(),
  bathrooms: z.number().optional(),
  floorNumber: z.number().optional(),
  askingPrice: z.number().min(1, 'minPrice'),
  currentRentalIncome: z.number().optional(),
  estimatedValue: z.number().optional(),
  description: z.string().min(20, 'requiredField'),
  uniqueSellingPoints: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SellProperty() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { submitProperty, uploadImage, uploadDocument, isSubmitting, submissionId } = useDealflowSubmit();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: 'apartment',
    },
  });

  const onSubmit = async (data: FormData) => {
    // Upload images
    const imageUrls = await Promise.all(
      selectedImages.map(file => uploadImage(file))
    );
    const validImageUrls = imageUrls.filter(url => url !== null) as string[];

    // Upload documents
    const documentUrls = await Promise.all(
      selectedDocuments.map(file => uploadDocument(file))
    );
    const validDocumentUrls = documentUrls.filter(url => url !== null) as string[];

    const result = await submitProperty({
      ...data,
      images: validImageUrls,
      documents: validDocumentUrls,
    });

    if (result.success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess && submissionId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] via-[#2D3748] to-[#1A1F2C] pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 text-center bg-white/5 backdrop-blur-sm border-white/10">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold text-white mb-4">{t('submissionSuccess')}</h1>
            <p className="text-white/80 mb-2">{t('thankYou')}</p>
            <p className="text-white/60 mb-6">{t('reviewMessage')}</p>
            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <p className="text-sm text-white/60 mb-1">{t('submissionId')}</p>
              <p className="text-white font-mono text-sm">{submissionId}</p>
            </div>
            <Button onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft size={16} />
              {t('backToHome')}
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] via-[#2D3748] to-[#1A1F2C] pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
            {t('sellToJungleRent')}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t('dealflowSubtitle')}
          </p>
        </div>

        {/* Why Us Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 text-center">
            <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-white mb-2">{t('fastProcess')}</h3>
            <p className="text-white/60">{t('fastProcessDesc')}</p>
          </Card>
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-white mb-2">{t('fairPrice')}</h3>
            <p className="text-white/60">{t('fairPriceDesc')}</p>
          </Card>
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-white mb-2">{t('noCommission')}</h3>
            <p className="text-white/60">{t('noCommissionDesc')}</p>
          </Card>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto p-8 bg-white/5 backdrop-blur-sm border-white/10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">{t('contactInformation')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('fullName')}</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('email')}</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('phoneOptional')}</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">{t('propertyDetails')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyAddress"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-white">{t('address')}</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('city')}</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyPostalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('postalCodeOptional')}</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white/10 border-white/20 text-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('propertyType')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">{t('apartment')}</SelectItem>
                            <SelectItem value="house">{t('house')}</SelectItem>
                            <SelectItem value="studio">{t('studio')}</SelectItem>
                            <SelectItem value="room">{t('room')}</SelectItem>
                            <SelectItem value="commercial">{t('commercial')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Size & Features */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">{t('sizeFeatures')}</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="sizeSqm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('sizeSqmOptional')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            className="bg-white/10 border-white/20 text-white" 
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
                        <FormLabel className="text-white">{t('roomsOptional')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            className="bg-white/10 border-white/20 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('bathroomsOptional')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            className="bg-white/10 border-white/20 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="floorNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('floorOptional')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            className="bg-white/10 border-white/20 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">{t('pricing')}</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="askingPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('askingPrice')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(Number(e.target.value))}
                            className="bg-white/10 border-white/20 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentRentalIncome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('currentRentalOptional')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            className="bg-white/10 border-white/20 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimatedValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t('estimatedValueOptional')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            className="bg-white/10 border-white/20 text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">{t('description')}</h2>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">{t('propertyDescription')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5}
                          placeholder={t('describeProperty')}
                          className="bg-white/10 border-white/20 text-white" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uniqueSellingPoints"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel className="text-white">{t('uniqueSellingPointsOptional')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={3}
                          className="bg-white/10 border-white/20 text-white" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Media Upload */}
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">{t('media')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white mb-2">{t('uploadImages')}</label>
                    <p className="text-sm text-white/60 mb-2">{t('uploadImagesDesc')}</p>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setSelectedImages(files.slice(0, 10));
                      }}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {selectedImages.length > 0 && (
                      <p className="text-sm text-primary mt-2">
                        {selectedImages.length} {selectedImages.length === 1 ? 'image' : 'images'} selected
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-2">{t('uploadDocuments')}</label>
                    <p className="text-sm text-white/60 mb-2">{t('uploadDocumentsDesc')}</p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setSelectedDocuments(files);
                      }}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {selectedDocuments.length > 0 && (
                      <p className="text-sm text-primary mt-2">
                        {selectedDocuments.length} {selectedDocuments.length === 1 ? 'document' : 'documents'} selected
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="border-white/20"
                >
                  {t('cancel')}
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? t('submitting') : t('submitProperty')}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
