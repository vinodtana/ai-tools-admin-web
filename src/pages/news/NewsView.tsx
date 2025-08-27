import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Calendar, Clock, Eye } from 'lucide-react';

const NewsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const newsItem = {
    id: id,
    name: 'OpenAI Releases GPT-4 Turbo with Vision',
    tagline: 'Enhanced AI model with multimodal capabilities',
    categories: ['AI Development', 'Machine Learning'],
    description: 'OpenAI has announced the release of GPT-4 Turbo with Vision, offering improved performance and multimodal capabilities for developers and enterprises.',
    bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    content: '<p>OpenAI has officially released GPT-4 Turbo with Vision, marking a significant advancement in artificial intelligence capabilities. This new model combines the power of large language models with computer vision, enabling it to understand and analyze images alongside text.</p><p>Key features include improved reasoning, better factual accuracy, and the ability to process visual content. The model is now available through OpenAI\'s API for developers and enterprises.</p>',
    authorName: 'Sarah Johnson',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b194?w=100&h=100&fit=crop&crop=face',
    authorBio: 'Senior AI Research Journalist',
    readtime: '5',
    tags: 'AI, GPT-4, OpenAI, Machine Learning',
    publishDate: '2024-01-15',
    viewsCount: 1250,
    isActive: true
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/news')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">News Article</h1>
            <p className="text-muted-foreground">Viewing article details</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/news/edit/${id}`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Article
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={newsItem.isActive ? 'default' : 'secondary'}>
                {newsItem.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {newsItem.publishDate}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {newsItem.readtime} min read
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {newsItem.viewsCount} views
                </div>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl">{newsItem.name}</CardTitle>
          <p className="text-lg text-muted-foreground">{newsItem.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {newsItem.bannerImage && (
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={newsItem.bannerImage}
                alt={newsItem.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="flex gap-2">
                {newsItem.categories.map((category, index) => (
                  <Badge key={index} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{newsItem.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Content</h3>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: newsItem.content }}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Author</h3>
              <div className="flex items-center gap-3">
                <img
                  src={newsItem.authorImage}
                  alt={newsItem.authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{newsItem.authorName}</p>
                  <p className="text-sm text-muted-foreground">{newsItem.authorBio}</p>
                </div>
              </div>
            </div>

            {newsItem.tags && (
              <div>
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex gap-2 flex-wrap">
                  {newsItem.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsView;