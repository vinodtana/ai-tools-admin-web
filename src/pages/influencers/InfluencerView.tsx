import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, MapPin, Users, ExternalLink } from 'lucide-react';

const InfluencerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const influencer = {
    id: id,
    name: 'Dr. Andrew Ng',
    tagline: 'AI thought leader and Stanford professor',
    categories: ['AI Education', 'Machine Learning'],
    description: 'Dr. Andrew Ng is a globally recognized leader in AI education and research, co-founder of Coursera, and former chief scientist at Baidu.',
    bannerImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
    bio: '<p>Dr. Andrew Ng is one of the most influential figures in artificial intelligence and machine learning. He co-founded Coursera, served as the chief scientist at Baidu, and led the Google Brain project.</p><p>Through his online courses and educational initiatives, Dr. Ng has democratized AI education, making it accessible to millions of learners worldwide.</p>',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    authorLocation: 'Stanford, CA',
    expertise: 'Machine Learning, Deep Learning, AI Education',
    socialLinkedin: 'https://linkedin.com/in/andrewyng',
    socialTwitter: 'https://twitter.com/AndrewYNg',
    socialWebsite: 'https://andrewyng.org',
    followersCount: '1200000',
    engagement: '4.2',
    isActive: true
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/influencers')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Influencer</h1>
            <p className="text-muted-foreground">Viewing influencer profile</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/influencers/edit/${id}`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={influencer.isActive ? 'default' : 'secondary'}>
                {influencer.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {influencer.authorLocation}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {Number(influencer.followersCount).toLocaleString()} followers
                </div>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl">{influencer.name}</CardTitle>
          <p className="text-lg text-muted-foreground">{influencer.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {influencer.bannerImage && (
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={influencer.bannerImage}
                alt={influencer.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Categories</h3>
                <div className="flex gap-2">
                  {influencer.categories.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{influencer.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Biography</h3>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: influencer.bio }}
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2">Expertise</h3>
                <div className="flex gap-2 flex-wrap">
                  {influencer.expertise.split(',').map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <img
                  src={influencer.authorImage}
                  alt={influencer.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="font-semibold">{influencer.name}</h4>
                <p className="text-sm text-muted-foreground">{influencer.authorLocation}</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold">{Number(influencer.followersCount).toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{influencer.engagement}%</div>
                  <div className="text-sm text-muted-foreground">Engagement Rate</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Social Links</h4>
                {influencer.socialWebsite && (
                  <a
                    href={influencer.socialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                )}
                {influencer.socialLinkedin && (
                  <a
                    href={influencer.socialLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
                {influencer.socialTwitter && (
                  <a
                    href={influencer.socialTwitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfluencerView;