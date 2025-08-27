import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCurrentTool } from '@/store/slices/toolsSlice';
import { ArrowLeft, Edit, ExternalLink, Star, Calendar, Eye } from 'lucide-react';

const ToolView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tools, currentTool } = useAppSelector((state) => state.tools);

  useEffect(() => {
    if (id) {
      const tool = tools.find(t => t.id === id);
      if (tool) {
        dispatch(setCurrentTool(tool));
      } else {
        navigate('/tools');
      }
    }
  }, [id, tools, dispatch, navigate]);

  if (!currentTool) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/tools')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{currentTool.name}</h1>
            <p className="text-muted-foreground">{currentTool.tagline}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/tools/edit/${currentTool.id}`)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button asChild>
            <a href={currentTool.toolUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Tool
            </a>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner Image */}
          {currentTool.bannerImage && (
            <Card>
              <CardContent className="p-0">
                <img
                  src={currentTool.bannerImage}
                  alt={currentTool.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              </CardContent>
            </Card>
          )}

          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: currentTool.overview }}
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: currentTool.description }}
              />
            </CardContent>
          </Card>

          {/* Features */}
          {currentTool.features && currentTool.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentTool.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Additional Images */}
          {currentTool.images && currentTool.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentTool.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${currentTool.name} screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tool Info */}
          <Card>
            <CardHeader>
              <CardTitle>Tool Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{currentTool.rating}/5</span>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-medium">{currentTool.companyName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Author</p>
                <p className="font-medium">{currentTool.authorBy}</p>
              </div>

              {currentTool.price && (
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">{currentTool.price}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={currentTool.isActive ? "default" : "secondary"}>
                  {currentTool.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              {currentTool.viewsCount && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{currentTool.viewsCount} views</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Categories */}
          {currentTool.categories && currentTool.categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentTool.categories.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolView;