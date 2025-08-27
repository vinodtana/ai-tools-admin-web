import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createPrompt, updatePrompt } from '@/store/slices/promptsSlice';
import { useToast } from '@/hooks/use-toast';
import { ChatGPTPrompt } from '@/store/slices/promptsSlice';
import { Save, ArrowLeft } from 'lucide-react';
import RichTextEditor from '@/components/common/RichTextEditor';
import MultiSelectCategories from '@/components/common/MultiSelectCategories';
import ImageUpload from '@/components/common/ImageUpload';

interface PromptFormProps {
  mode: 'create' | 'edit';
}

const PromptForm = ({ mode }: PromptFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { prompts, isLoading } = useAppSelector((state) => state.prompts);

  const [overview, setOverview] = useState('');
  const [promptTemplate, setPromptTemplate] = useState('');
  const [howToUse, setHowToUse] = useState('');
  const [review, setReview] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);
  const [bannerImage, setBannerImage] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ChatGPTPrompt>({
    defaultValues: {
      name: '',
      tagline: '',
      rating: 0,
      authorBy: '',
      authorLink: '',
      authorRole: '',
      usersCount: 0,
      readtime: 0,
      viewsCount: 0,
      overview: '',
      promptTemplate: '',
      useCases: [],
      howToUse: '',
      review: '',
      categories: [],
      bannerImage: '',
      images: [],
      isActive: true,
    }
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      const prompt = prompts.find(p => p.id === id);
      if (prompt) {
        reset({
          name: prompt.name || '',
          tagline: prompt.tagline || '',
          rating: prompt.rating || 0,
          authorBy: prompt.authorBy || '',
          authorLink: prompt.authorLink || '',
          authorRole: prompt.authorRole || '',
          usersCount: prompt.usersCount || 0,
          readtime: prompt.readtime || 0,
          viewsCount: prompt.viewsCount || 0,
          overview: prompt.overview || '',
          promptTemplate: prompt.promptTemplate || '',
          howToUse: prompt.howToUse || '',
          review: prompt.review || '',
          isActive: prompt.isActive ?? true,
        });
        
        setOverview(prompt.overview || '');
        setPromptTemplate(prompt.promptTemplate || '');
        setHowToUse(prompt.howToUse || '');
        setReview(prompt.review || '');
        setCategories(prompt.categories || []);
        setUseCases(prompt.useCases || []);
        setBannerImage(prompt.bannerImage || '');
        setImages(prompt.images || []);
      }
    }
  }, [mode, id, prompts, reset]);

  const onSubmit = async (data: ChatGPTPrompt) => {
    try {
      const promptData = {
        ...data,
        overview,
        promptTemplate,
        howToUse,
        review,
        categories,
        useCases,
        bannerImage,
        images,
      };

      if (mode === 'create') {
        await dispatch(createPrompt(promptData)).unwrap();
        toast({
          title: 'Success',
          description: 'Prompt created successfully',
        });
      } else {
        await dispatch(updatePrompt({ id: id!, prompt: promptData })).unwrap();
        toast({
          title: 'Success',
          description: 'Prompt updated successfully',
        });
      }
      navigate('/prompts');
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${mode} prompt`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/prompts')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Prompts
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {mode === 'create' ? 'Create ChatGPT Prompt' : 'Edit ChatGPT Prompt'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'create' ? 'Add a new ChatGPT prompt to the database' : 'Update prompt information'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about the ChatGPT prompt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline *</Label>
                <Input
                  id="tagline"
                  {...register('tagline', { required: 'Tagline is required' })}
                  className={errors.tagline ? 'border-destructive' : ''}
                />
                {errors.tagline && (
                  <p className="text-sm text-destructive">{errors.tagline.message}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <MultiSelectCategories
                  label="Categories"
                  value={categories}
                  onChange={setCategories}
                  placeholder="Select categories..."
                  required={true}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  {...register('rating', { required: 'Rating is required' })}
                  className={errors.rating ? 'border-destructive' : ''}
                />
                {errors.rating && (
                  <p className="text-sm text-destructive">{errors.rating.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorBy">Author</Label>
                <Input id="authorBy" {...register('authorBy')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorLink">Author Link</Label>
                <Input id="authorLink" type="url" {...register('authorLink')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorRole">Author Role</Label>
                <Input id="authorRole" {...register('authorRole')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="usersCount">Users Count</Label>
                <Input id="usersCount" type="number" {...register('usersCount')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readtime">Read Time (minutes)</Label>
                <Input id="readtime" type="number" {...register('readtime')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="viewsCount">Views Count</Label>
                <Input id="viewsCount" type="number" {...register('viewsCount')} />
              </div>
            </div>

            <RichTextEditor
              label="Overview"
              value={overview}
              onChange={setOverview}
              placeholder="Enter prompt overview with bullet points..."
              required={true}
              error={!overview ? 'Overview is required' : undefined}
            />

            <RichTextEditor
              label="Prompt Template"
              value={promptTemplate}
              onChange={setPromptTemplate}
              placeholder="Enter the ChatGPT prompt template..."
              required={true}
              error={!promptTemplate ? 'Prompt template is required' : undefined}
            />

            <RichTextEditor
              label="How to Use"
              value={howToUse}
              onChange={setHowToUse}
              placeholder="Instructions on how to use this prompt..."
            />

            <RichTextEditor
              label="Review"
              value={review}
              onChange={setReview}
              placeholder="Enter review or feedback about this prompt..."
            />
          </CardContent>
        </Card>


        {/* Use Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Use Cases</CardTitle>
            <CardDescription>Add key use cases as bullet points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={useCase}
                    onChange={(e) => {
                      const newUseCases = [...useCases];
                      newUseCases[index] = e.target.value;
                      setUseCases(newUseCases);
                    }}
                    placeholder="Enter use case"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setUseCases(useCases.filter((_, i) => i !== index))}
                    disabled={useCases.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setUseCases([...useCases, ''])}
              >
                Add Use Case
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Upload banner image and additional images (up to 10)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload
              label="Banner Image"
              value={bannerImage}
              onChange={(value) => setBannerImage(value as string)}
              multiple={false}
              required={true}
            />

            <ImageUpload
              label="Additional Images (up to 10)"
              value={images}
              onChange={(value) => setImages(value as string[])}
              multiple={true}
            />
          </CardContent>
        </Card>

        {/* Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Set the visibility status of this prompt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                {...register('isActive')}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons - Right Aligned */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/prompts')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-gradient-primary">
            <Save className="w-4 h-4 mr-2" />
            {mode === 'create' ? 'Create Prompt' : 'Update Prompt'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;