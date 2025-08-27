import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Calendar, Clock, Eye, Star, User } from 'lucide-react';

const PromptView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const prompt = {
    id: id,
    name: 'Content Marketing Strategy Generator',
    tagline: 'Generate comprehensive content marketing strategies',
    categories: ['Marketing', 'Content Creation', 'Strategy'],
    rating: 4.8,
    authorBy: 'Marketing Expert',
    authorLink: 'https://example.com/author',
    authorRole: 'Digital Marketing Specialist',
    usersCount: 1520,
    readtime: 5,
    viewsCount: 8420,
    overview: '<p>This prompt helps you create detailed content marketing strategies tailored to your business needs. It covers audience analysis, content planning, distribution channels, and performance metrics.</p>',
    promptTemplate: '<p>Create a comprehensive content marketing strategy for [BUSINESS TYPE] targeting [TARGET AUDIENCE]. Include: 1) Audience analysis 2) Content pillars 3) Content calendar 4) Distribution strategy 5) Success metrics</p>',
    useCases: ['Small Business Marketing', 'Product Launches', 'Brand Awareness Campaigns', 'Lead Generation'],
    howToUse: '<p>1. Replace [BUSINESS TYPE] with your specific business type<br>2. Define your target audience clearly<br>3. Run the prompt in ChatGPT<br>4. Customize the output based on your needs</p>',
    review: '<p>Excellent prompt for creating structured marketing strategies. Provides comprehensive coverage of all essential elements.</p>',
    bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
    ],
    isActive: true,
    createdAt: '2024-01-15',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/prompts')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Prompts
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{prompt.name}</h1>
            <p className="text-muted-foreground">{prompt.tagline}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/prompts/edit/${id}`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Prompt
        </Button>
      </div>

      {/* Status and Metrics */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Badge variant={prompt.isActive ? "default" : "secondary"}>
                {prompt.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{prompt.rating}/5</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{prompt.usersCount.toLocaleString()} users</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{prompt.readtime} min read</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{prompt.viewsCount.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Created {new Date(prompt.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banner Image */}
      {prompt.bannerImage && (
        <Card>
          <CardContent className="p-0">
            <img 
              src={prompt.bannerImage} 
              alt={prompt.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {prompt.categories.map((category, index) => (
              <Badge key={index} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: prompt.overview }}
          />
        </CardContent>
      </Card>

      {/* Prompt Template */}
      <Card>
        <CardHeader>
          <CardTitle>Prompt Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none text-foreground bg-muted p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: prompt.promptTemplate }}
          />
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {prompt.useCases.map((useCase, index) => (
              <li key={index} className="text-foreground">{useCase}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* How to Use */}
      {prompt.howToUse && (
        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: prompt.howToUse }}
            />
          </CardContent>
        </Card>
      )}

      {/* Review */}
      {prompt.review && (
        <Card>
          <CardHeader>
            <CardTitle>Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: prompt.review }}
            />
          </CardContent>
        </Card>
      )}

      {/* Author Info */}
      <Card>
        <CardHeader>
          <CardTitle>Author Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Name:</strong> {prompt.authorBy}</p>
            <p><strong>Role:</strong> {prompt.authorRole}</p>
            {prompt.authorLink && (
              <p>
                <strong>Profile:</strong> 
                <a href={prompt.authorLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">
                  View Profile
                </a>
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Images */}
      {prompt.images && prompt.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {prompt.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${prompt.name} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptView;