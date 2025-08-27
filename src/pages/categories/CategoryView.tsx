import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Hash, Globe } from 'lucide-react';

const CategoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const category = {
    id: id,
    name: 'AI Writing Tools',
    tagline: 'Discover the best AI writing tools and resources',
    description: 'Explore curated AI writing tools, resources, and solutions to enhance your content creation workflow.',
    bannerImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
    content: '<p>AI writing tools have revolutionized content creation, offering writers and businesses powerful solutions to generate high-quality content efficiently.</p><p>From blog posts to marketing copy, these tools leverage advanced language models to assist with various writing tasks while maintaining quality and creativity.</p>',
    parentCategory: 'AI Tools',
    slug: 'ai-writing-tools',
    metaTitle: 'AI Writing Tools - Best AI Content Creation Tools',
    metaDescription: 'Discover the best AI writing tools and resources. Compare features, pricing, and reviews of top AI content creation solutions.',
    sortOrder: '1',
    itemCount: 25,
    isActive: true
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/categories')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Category Details</h1>
            <p className="text-muted-foreground">Viewing category information</p>
          </div>
        </div>
        <Button onClick={() => navigate(`/categories/edit/${id}`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={category.isActive ? 'default' : 'secondary'}>
                {category.isActive ? 'Active' : 'Inactive'}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Hash className="w-4 h-4" />
                  {category.itemCount} items
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  /{category.slug}
                </div>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl">{category.name}</CardTitle>
          <p className="text-lg text-muted-foreground">{category.tagline}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {category.bannerImage && (
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={category.bannerImage}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Content</h3>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: category.content }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">Category Details</h4>
                
                {category.parentCategory && (
                  <div>
                    <div className="text-sm text-muted-foreground">Parent Category</div>
                    <div className="font-medium">{category.parentCategory}</div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-muted-foreground">URL Slug</div>
                  <div className="font-medium font-mono text-sm">/{category.slug}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Sort Order</div>
                  <div className="font-medium">{category.sortOrder}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Items Count</div>
                  <div className="font-medium">{category.itemCount}</div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">SEO Settings</h4>
                
                <div>
                  <div className="text-sm text-muted-foreground">Meta Title</div>
                  <div className="text-sm">{category.metaTitle}</div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Meta Description</div>
                  <div className="text-sm">{category.metaDescription}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryView;