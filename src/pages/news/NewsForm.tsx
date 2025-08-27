import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/common/ImageUpload';
import MultiSelectCategories from '@/components/common/MultiSelectCategories';
import RichTextEditor from '@/components/common/RichTextEditor';

interface NewsFormData {
  name: string;
  tagline: string;
  categories: string[];
  description: string;
  bannerImage: string;
  images: string[];
  content: string;
  authorName: string;
  authorImage: string;
  authorBio: string;
  readtime: string;
  tags: string;
  publishDate: string;
  isActive: boolean;
}

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<NewsFormData>({
    defaultValues: {
      name: '',
      tagline: '',
      categories: [],
      description: '',
      bannerImage: '',
      images: [],
      content: '',
      authorName: '',
      authorImage: '',
      authorBio: '',
      readtime: '',
      tags: '',
      publishDate: '',
      isActive: true,
    }
  });

  // Watch for form changes to enable autofill
  const watchedFields = watch();

  useEffect(() => {
    if (watchedFields.name && !isEdit) {
      // Autofill tagline based on name
      if (!watchedFields.tagline) {
        setValue('tagline', `Latest ${watchedFields.name} news and updates`);
      }
      
      // Autofill description based on name
      if (!watchedFields.description) {
        setValue('description', `Stay updated with the latest news about ${watchedFields.name} and related developments in the AI industry.`);
      }
    }
  }, [watchedFields.name, isEdit, setValue, watchedFields.tagline, watchedFields.description]);

  const onSubmit = (data: NewsFormData) => {
    toast({
      title: isEdit ? 'News Updated' : 'News Created',
      description: `${data.name} has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
    navigate('/news');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/news')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEdit ? 'Edit News Article' : 'Create News Article'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the news article details' : 'Add a new AI news article'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Article Title *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Article title is required' })}
                  placeholder="Enter article title"
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
                  placeholder="Enter article tagline"
                />
                {errors.tagline && (
                  <p className="text-sm text-destructive">{errors.tagline.message}</p>
                )}
              </div>
            </div>

            <MultiSelectCategories
              label="Categories"
              value={watchedFields.categories}
              onChange={(categories) => setValue('categories', categories)}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                placeholder="Enter article description"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUpload
              label="Banner Image"
              value={watchedFields.bannerImage}
              onChange={(bannerImage) => setValue('bannerImage', bannerImage as string)}
              multiple={false}
              required
            />

            <ImageUpload
              label="Additional Images"
              value={watchedFields.images}
              onChange={(images) => setValue('images', images as string[])}
              multiple={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RichTextEditor
              label="Article Content"
              value={watchedFields.content}
              onChange={(content) => setValue('content', content)}
              placeholder="Write your article content here..."
              required
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Author Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="authorName">Author Name *</Label>
                <Input
                  id="authorName"
                  {...register('authorName', { required: 'Author name is required' })}
                  placeholder="Enter author name"
                />
                {errors.authorName && (
                  <p className="text-sm text-destructive">{errors.authorName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorImage">Author Image URL</Label>
                <Input
                  id="authorImage"
                  {...register('authorImage')}
                  placeholder="Enter author image URL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorBio">Author Bio</Label>
              <Textarea
                id="authorBio"
                {...register('authorBio')}
                placeholder="Enter author biography"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="readtime">Read Time (minutes)</Label>
                <Input
                  id="readtime"
                  {...register('readtime')}
                  placeholder="e.g., 5"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  {...register('tags')}
                  placeholder="e.g., AI, Technology, News"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishDate">Publish Date</Label>
                <Input
                  id="publishDate"
                  {...register('publishDate')}
                  type="date"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={watchedFields.isActive}
                onCheckedChange={(checked) => setValue('isActive', checked)}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/news')}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update' : 'Create'} News Article
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;