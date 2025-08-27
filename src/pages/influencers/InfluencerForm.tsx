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

interface InfluencerFormData {
  name: string;
  tagline: string;
  categories: string[];
  description: string;
  bannerImage: string;
  images: string[];
  bio: string;
  authorImage: string;
  authorLocation: string;
  expertise: string;
  socialLinkedin: string;
  socialTwitter: string;
  socialWebsite: string;
  followersCount: string;
  engagement: string;
  isActive: boolean;
}

const InfluencerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<InfluencerFormData>({
    defaultValues: {
      name: '',
      tagline: '',
      categories: [],
      description: '',
      bannerImage: '',
      images: [],
      bio: '',
      authorImage: '',
      authorLocation: '',
      expertise: '',
      socialLinkedin: '',
      socialTwitter: '',
      socialWebsite: '',
      followersCount: '',
      engagement: '',
      isActive: true,
    }
  });

  // Watch for form changes to enable autofill
  const watchedFields = watch();

  useEffect(() => {
    if (watchedFields.name && !isEdit) {
      // Autofill tagline based on name
      if (!watchedFields.tagline) {
        setValue('tagline', `AI thought leader and expert in ${watchedFields.name.split(' ')[0]}`);
      }
      
      // Autofill description based on name
      if (!watchedFields.description) {
        setValue('description', `${watchedFields.name} is a leading voice in the AI community, sharing insights and expertise on artificial intelligence technologies.`);
      }
    }
  }, [watchedFields.name, isEdit, setValue, watchedFields.tagline, watchedFields.description]);

  const onSubmit = (data: InfluencerFormData) => {
    toast({
      title: isEdit ? 'Influencer Updated' : 'Influencer Created',
      description: `${data.name} has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
    navigate('/influencers');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/influencers')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEdit ? 'Edit AI Influencer' : 'Create AI Influencer'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the influencer details' : 'Add a new AI influencer'}
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
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Full name is required' })}
                  placeholder="Enter full name"
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
                placeholder="Enter description"
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

            <div className="space-y-2">
              <Label htmlFor="authorImage">Profile Image URL</Label>
              <Input
                id="authorImage"
                {...register('authorImage')}
                placeholder="Enter profile image URL"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Biography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RichTextEditor
              label="Biography"
              value={watchedFields.bio}
              onChange={(bio) => setValue('bio', bio)}
              placeholder="Write the influencer's biography..."
              required
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="authorLocation">Location</Label>
                <Input
                  id="authorLocation"
                  {...register('authorLocation')}
                  placeholder="Enter location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertise">Expertise Areas</Label>
                <Input
                  id="expertise"
                  {...register('expertise')}
                  placeholder="e.g., Machine Learning, NLP"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="followersCount">Followers Count</Label>
                <Input
                  id="followersCount"
                  {...register('followersCount')}
                  placeholder="e.g., 50K"
                  type="number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="engagement">Engagement Rate (%)</Label>
                <Input
                  id="engagement"
                  {...register('engagement')}
                  placeholder="e.g., 3.5"
                  type="number"
                  step="0.1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="socialLinkedin">LinkedIn URL</Label>
                <Input
                  id="socialLinkedin"
                  {...register('socialLinkedin')}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="socialTwitter">Twitter URL</Label>
                <Input
                  id="socialTwitter"
                  {...register('socialTwitter')}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialWebsite">Website URL</Label>
              <Input
                id="socialWebsite"
                {...register('socialWebsite')}
                placeholder="https://website.com"
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
          <Button type="button" variant="outline" onClick={() => navigate('/influencers')}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update' : 'Create'} Influencer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InfluencerForm;