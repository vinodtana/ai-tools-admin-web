import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { createArticle, updateArticle } from '@/store/slices/articlesSlice';
import { useToast } from '@/hooks/use-toast';
import { AIArticle } from '@/store/slices/articlesSlice';
import { Save, ArrowLeft } from 'lucide-react';
import RichTextEditor from '@/components/common/RichTextEditor';
import MultiSelectCategories from '@/components/common/MultiSelectCategories';
import ImageUpload from '@/components/common/ImageUpload';

interface ArticleFormProps {
  mode: 'create' | 'edit';
}

const ArticleForm = ({ mode }: ArticleFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { articles, isLoading } = useAppSelector((state) => state.articles);

  const [overview, setOverview] = useState('');
  const [description, setDescription] = useState('');
  const [review, setReview] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [bannerImage, setBannerImage] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<AIArticle>({
    defaultValues: {
      name: '',
      tagline: '',
      rating: 0,
      readtime: 0,
      authorBy: '',
      authorLink: '',
      authorRole: '',
      usersCount: 0,
      viewsCount: 0,
      overview: '',
      description: '',
      review: '',
      categories: [],
      bannerImage: '',
      images: [],
      isActive: true,
    }
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      const article = articles.find(a => a.id === id);
      if (article) {
        reset({
          name: article.name || '',
          tagline: article.tagline || '',
          rating: article.rating || 0,
          readtime: article.readtime || 0,
          authorBy: article.authorBy || '',
          authorLink: article.authorLink || '',
          authorRole: article.authorRole || '',
          usersCount: article.usersCount || 0,
          viewsCount: article.viewsCount || 0,
          overview: article.overview || '',
          description: article.description || '',
          review: article.review || '',
          isActive: article.isActive ?? true,
        });
        
        setOverview(article.overview || '');
        setDescription(article.description || '');
        setReview(article.review || '');
        setCategories(article.categories || []);
        setBannerImage(article.bannerImage || '');
        setImages(article.images || []);
      }
    }
  }, [mode, id, articles, reset]);

  const onSubmit = async (data: AIArticle) => {
    try {
      const articleData = {
        ...data,
        overview,
        description,
        review,
        categories,
        bannerImage,
        images,
      };

      if (mode === 'create') {
        await dispatch(createArticle(articleData)).unwrap();
        toast({
          title: 'Success',
          description: 'Article created successfully',
        });
      } else {
        await dispatch(updateArticle({ id: id!, article: articleData })).unwrap();
        toast({
          title: 'Success',
          description: 'Article updated successfully',
        });
      }
      navigate('/articles');
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${mode} article`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/articles')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {mode === 'create' ? 'Create AI Article' : 'Edit AI Article'}
          </h1>
          <p className="text-muted-foreground">
            {mode === 'create' ? 'Add a new AI article to the database' : 'Update article information'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Essential details about the AI article</CardDescription>
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
                <Label htmlFor="readtime">Read Time (minutes) *</Label>
                <Input
                  id="readtime"
                  type="number"
                  {...register('readtime', { required: 'Read time is required' })}
                  className={errors.readtime ? 'border-destructive' : ''}
                />
                {errors.readtime && (
                  <p className="text-sm text-destructive">{errors.readtime.message}</p>
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
                <Label htmlFor="viewsCount">Views Count</Label>
                <Input id="viewsCount" type="number" {...register('viewsCount')} />
              </div>
            </div>

            <RichTextEditor
              label="Overview"
              value={overview}
              onChange={setOverview}
              placeholder="Enter article overview with bullet points..."
              required={true}
              error={!overview ? 'Overview is required' : undefined}
            />

            <RichTextEditor
              label="Description"
              value={description}
              onChange={setDescription}
              placeholder="Enter detailed description with bullet points..."
              required={true}
              error={!description ? 'Description is required' : undefined}
            />

            <RichTextEditor
              label="Review"
              value={review}
              onChange={setReview}
              placeholder="Enter review or feedback about this article..."
            />
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Select relevant categories for this article</CardDescription>
          </CardHeader>
          <CardContent>
            <MultiSelectCategories
              label="Categories"
              value={categories}
              onChange={setCategories}
              placeholder="Select categories..."
              required={true}
            />
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
            <CardDescription>Set the visibility status of this article</CardDescription>
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
          <Button type="button" variant="outline" onClick={() => navigate('/articles')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-gradient-primary">
            <Save className="w-4 h-4 mr-2" />
            {mode === 'create' ? 'Create Article' : 'Update Article'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;