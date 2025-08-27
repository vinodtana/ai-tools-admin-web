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
import RichTextEditor from '@/components/common/RichTextEditor';

interface CategoryFormData {
  name: string;
  tagline: string;
  description: string;
  bannerImage: string;
  images: string[];
  content: string;
  parentCategory: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  sortOrder: string;
  isActive: boolean;
}

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CategoryFormData>({
    defaultValues: {
      name: '',
      tagline: '',
      description: '',
      bannerImage: '',
      images: [],
      content: '',
      parentCategory: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      sortOrder: '',
      isActive: true,
    }
  });

  // Watch for form changes to enable autofill
  const watchedFields = watch();

  useEffect(() => {
    if (watchedFields.name && !isEdit) {
      // Autofill tagline based on name
      if (!watchedFields.tagline) {
        setValue('tagline', `Discover the best ${watchedFields.name.toLowerCase()} tools and resources`);
      }
      
      // Autofill description based on name
      if (!watchedFields.description) {
        setValue('description', `Explore curated ${watchedFields.name.toLowerCase()} tools, resources, and solutions to enhance your workflow.`);
      }

      // Autofill slug based on name
      if (!watchedFields.slug) {
        setValue('slug', watchedFields.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
      }

      // Autofill meta title
      if (!watchedFields.metaTitle) {
        setValue('metaTitle', `${watchedFields.name} - AI Tools and Resources`);
      }

      // Autofill meta description
      if (!watchedFields.metaDescription) {
        setValue('metaDescription', `Discover the best ${watchedFields.name.toLowerCase()} AI tools and resources. Compare features, pricing, and reviews.`);
      }
    }
  }, [watchedFields.name, isEdit, setValue, watchedFields.tagline, watchedFields.description, watchedFields.slug, watchedFields.metaTitle, watchedFields.metaDescription]);

  const onSubmit = (data: CategoryFormData) => {
    toast({
      title: isEdit ? 'Category Updated' : 'Category Created',
      description: `${data.name} has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
    navigate('/categories');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/categories')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEdit ? 'Edit Category' : 'Create Category'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the category details' : 'Add a new AI category'}
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
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Category name is required' })}
                  placeholder="Enter category name"
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
                  placeholder="Enter tagline"
                />
                {errors.tagline && (
                  <p className="text-sm text-destructive">{errors.tagline.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                placeholder="Enter category description"
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
              label="Category Content"
              value={watchedFields.content}
              onChange={(content) => setValue('content', content)}
              placeholder="Write detailed content about this category..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="parentCategory">Parent Category</Label>
                <Input
                  id="parentCategory"
                  {...register('parentCategory')}
                  placeholder="Enter parent category (optional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  {...register('slug', { required: 'URL slug is required' })}
                  placeholder="category-url-slug"
                />
                {errors.slug && (
                  <p className="text-sm text-destructive">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                {...register('sortOrder')}
                placeholder="e.g., 1"
                type="number"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                {...register('metaTitle')}
                placeholder="Enter meta title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                {...register('metaDescription')}
                placeholder="Enter meta description"
                rows={3}
              />
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
          <Button type="button" variant="outline" onClick={() => navigate('/categories')}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update' : 'Create'} Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;