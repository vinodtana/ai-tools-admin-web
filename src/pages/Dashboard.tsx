import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Wrench, FileText, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total AI Tools',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Wrench,
      description: 'Active tools in the database'
    },
    {
      title: 'ChatGPT Prompts',
      value: '856',
      change: '+8%',
      changeType: 'positive',
      icon: FileText,
      description: 'Published prompts'
    },
    {
      title: 'Total Users',
      value: '12,845',
      change: '+23%',
      changeType: 'positive',
      icon: Users,
      description: 'Registered users'
    },
    {
      title: 'Monthly Growth',
      value: '24.5%',
      change: '+4.2%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'User engagement rate'
    }
  ];

  const recentActivity = [
    { type: 'AI Tool', name: 'ChatGPT-4 Turbo', action: 'Created', time: '2 hours ago' },
    { type: 'Article', name: 'AI in Healthcare', action: 'Published', time: '4 hours ago' },
    { type: 'User', name: 'john@example.com', action: 'Registered', time: '6 hours ago' },
    { type: 'Prompt', name: 'Code Reviewer', action: 'Updated', time: '8 hours ago' },
    { type: 'Category', name: 'Machine Learning', action: 'Created', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <Badge 
                  variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates across all sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{activity.name}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 hover:bg-accent cursor-pointer transition-smooth">
                <div className="text-center">
                  <Wrench className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Add AI Tool</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-accent cursor-pointer transition-smooth">
                <div className="text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Create Article</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-accent cursor-pointer transition-smooth">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Manage Users</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-accent cursor-pointer transition-smooth">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">View Analytics</p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;