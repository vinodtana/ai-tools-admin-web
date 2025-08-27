import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/common/ImageUpload';

interface ManageUserFormData {
  name: string;
  tagline: string;
  email: string;
  role: string;
  permissions: string[];
  bannerImage: string;
  images: string[];
  profileImage: string;
  department: string;
  phone: string;
  address: string;
  bio: string;
  emergencyContact: string;
  startDate: string;
  salary: string;
  isActive: boolean;
}

const ManageUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ManageUserFormData>({
    defaultValues: {
      name: '',
      tagline: '',
      email: '',
      role: '',
      permissions: [],
      bannerImage: '',
      images: [],
      profileImage: '',
      department: '',
      phone: '',
      address: '',
      bio: '',
      emergencyContact: '',
      startDate: '',
      salary: '',
      isActive: true,
    }
  });

  // Watch for form changes to enable autofill
  const watchedFields = watch();

  useEffect(() => {
    if (watchedFields.name && !isEdit) {
      // Autofill tagline based on name and role
      if (!watchedFields.tagline && watchedFields.role) {
        setValue('tagline', `${watchedFields.role} at AI Admin Portal`);
      }
      
      // Autofill email based on name
      if (!watchedFields.email) {
        const emailName = watchedFields.name.toLowerCase().replace(/\s+/g, '.');
        setValue('email', `${emailName}@company.com`);
      }
    }
  }, [watchedFields.name, watchedFields.role, isEdit, setValue, watchedFields.tagline, watchedFields.email]);

  const onSubmit = (data: ManageUserFormData) => {
    toast({
      title: isEdit ? 'User Updated' : 'User Created',
      description: `${data.name} has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
    navigate('/manage-users');
  };

  const roleOptions = [
    'Super Admin',
    'Admin',
    'Editor',
    'Moderator',
    'Content Manager',
    'Viewer'
  ];

  const permissionOptions = [
    'All',
    'Create',
    'Read',
    'Update',
    'Delete',
    'Moderate',
    'Publish',
    'Analytics'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/manage-users')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEdit ? 'Edit User' : 'Create User'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? 'Update the user details' : 'Add a new admin user'}
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
                <Label htmlFor="tagline">Title/Position *</Label>
                <Input
                  id="tagline"
                  {...register('tagline', { required: 'Title is required' })}
                  placeholder="Enter job title"
                />
                {errors.tagline && (
                  <p className="text-sm text-destructive">{errors.tagline.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select onValueChange={(value) => setValue('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-destructive">{errors.role.message}</p>
                )}
              </div>
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
            />

            <ImageUpload
              label="Additional Images"
              value={watchedFields.images}
              onChange={(images) => setValue('images', images as string[])}
              multiple={true}
            />

            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input
                id="profileImage"
                {...register('profileImage')}
                placeholder="Enter profile image URL"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  {...register('department')}
                  placeholder="Enter department"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                {...register('address')}
                placeholder="Enter address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                {...register('emergencyContact')}
                placeholder="Enter emergency contact"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                {...register('bio')}
                placeholder="Enter user biography"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register('startDate')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  {...register('salary')}
                  placeholder="Enter salary"
                  type="number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {permissionOptions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`permission-${permission}`}
                      onChange={(e) => {
                        const permissions = watchedFields.permissions || [];
                        if (e.target.checked) {
                          setValue('permissions', [...permissions, permission]);
                        } else {
                          setValue('permissions', permissions.filter(p => p !== permission));
                        }
                      }}
                    />
                    <Label htmlFor={`permission-${permission}`} className="text-sm">
                      {permission}
                    </Label>
                  </div>
                ))}
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
          <Button type="button" variant="outline" onClick={() => navigate('/manage-users')}>
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            {isEdit ? 'Update' : 'Create'} User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageUserForm;