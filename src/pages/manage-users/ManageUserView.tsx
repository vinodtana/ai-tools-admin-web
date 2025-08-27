import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Mail, Phone, Calendar, Shield } from 'lucide-react';

const ManageUserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const user = {
    id: id,
    name: 'Sarah Johnson',
    tagline: 'Senior Administrator at AI Admin Portal',
    email: 'sarah.johnson@company.com',
    role: 'Super Admin',
    permissions: ['All'],
    bannerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b194?w=200&h=200&fit=crop&crop=face',
    department: 'Technology',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
    bio: 'Sarah is a seasoned administrator with over 8 years of experience in managing AI platforms and systems. She specializes in user management, system optimization, and team coordination.',
    emergencyContact: 'John Johnson - +1 (555) 987-6543',
    startDate: '2020-03-15',
    salary: '95000',
    lastLogin: '2024-01-15T10:30:00Z',
    isActive: true
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/manage-users')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
            <p className="text-muted-foreground">Viewing user details</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/manage-users/edit/${id}`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={user.isActive ? 'default' : 'secondary'}>
                {user.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <Badge variant="outline">
                <Shield className="w-3 h-3 mr-1" />
                {user.role}
              </Badge>
              <div className="text-sm text-muted-foreground">
                Last login: {formatDateTime(user.lastLogin)}
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <p className="text-lg text-muted-foreground">{user.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {user.bannerImage && (
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={user.bannerImage}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.address && (
                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-0.5">📍</div>
                      <span>{user.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Biography</h3>
                <p className="text-muted-foreground">{user.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Permissions</h3>
                <div className="flex gap-2 flex-wrap">
                  {user.permissions.map((permission, index) => (
                    <Badge key={index} variant="secondary">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              {user.emergencyContact && (
                <div>
                  <h3 className="font-semibold mb-2">Emergency Contact</h3>
                  <p className="text-muted-foreground">{user.emergencyContact}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.department}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">Employment Details</h4>
                
                <div>
                  <div className="text-sm text-muted-foreground">Role</div>
                  <div className="font-medium">{user.role}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Department</div>
                  <div className="font-medium">{user.department}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(user.startDate)}
                  </div>
                </div>

                {user.salary && (
                  <div>
                    <div className="text-sm text-muted-foreground">Salary</div>
                    <div className="font-medium">${Number(user.salary).toLocaleString()}</div>
                  </div>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">Account Status</h4>
                
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <Badge variant={user.isActive ? 'default' : 'secondary'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Last Login</div>
                  <div className="text-sm">{formatDateTime(user.lastLogin)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageUserView;