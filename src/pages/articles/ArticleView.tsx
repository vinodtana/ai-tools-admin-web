import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Calendar, Clock, Eye, Star, User } from 'lucide-react';

const ArticleView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const article = {
    id: id,
    name: 'Understanding Large Language Models',
    tagline: 'A comprehensive guide to modern AI language models',
    categories: ['AI Education', 'Machine Learning', 'NLP'],
    rating: 4.9,
    authorBy: 'Dr. Sarah Chen',
    authorLink: 'https://example.com/author',
    authorRole: 'AI Research Scientist',
    readtime: 12,
    viewsCount: 15420,
    overview: '<p>This comprehensive article explores the architecture, training, and applications of large language models like GPT, BERT, and T5. Learn about the technological breakthroughs that enable these models to understand and generate human-like text.</p>',
    description: '<p>Large Language Models (LLMs) represent a significant breakthrough in artificial intelligence. This article covers:<br>• Transformer architecture fundamentals<br>• Training methodologies and datasets<br>• Fine-tuning techniques<br>• Real-world applications and limitations<br>• Future developments in the field</p>',
    review: '<p>An excellent introduction to LLMs that balances technical depth with accessibility. Perfect for both beginners and experienced practitioners looking to understand the latest developments.</p>',
    bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=200&fit=crop'
    ],
    isActive: true,
    createdAt: '2024-01-20',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/articles')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{article.name}</h1>
            <p className="text-muted-foreground">{article.tagline}</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/articles/edit/${id}`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Article
        </Button>
      </div>

      {/* Status and Metrics */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Badge variant={article.isActive ? "default" : "secondary"}>
                {article.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{article.rating}/5</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{article.readtime} min read</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{article.viewsCount.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Created {new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Banner Image */}
      {article.bannerImage && (
        <Card>
          <CardContent className="p-0">
            <img 
              src={article.bannerImage} 
              alt={article.name}
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
            {article.categories.map((category, index) => (
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
            dangerouslySetInnerHTML={{ __html: article.overview }}
          />
        </CardContent>
      </Card>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Article Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </CardContent>
      </Card>

      {/* Review */}
      {article.review && (
        <Card>
          <CardHeader>
            <CardTitle>Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: article.review }}
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
            <p><strong>Name:</strong> {article.authorBy}</p>
            <p><strong>Role:</strong> {article.authorRole}</p>
            {article.authorLink && (
              <p>
                <strong>Profile:</strong> 
                <a href={article.authorLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">
                  View Profile
                </a>
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Images */}
      {article.images && article.images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {article.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${article.name} ${index + 1}`}
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

export default ArticleView;