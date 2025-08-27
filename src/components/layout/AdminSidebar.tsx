import { 
  LayoutDashboard, 
  Wrench, 
  MessageSquare, 
  FileText, 
  Newspaper, 
  Users, 
  Folder, 
  User, 
  Mail,
  Settings 
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'AI Contents', url: '/contents', icon: Wrench },
  // { title: 'ChatGPT Prompts', url: '/prompts', icon: MessageSquare },
  // { title: 'AI Articles', url: '/articles', icon: FileText },
  // { title: 'AI News', url: '/news', icon: Newspaper },
  // { title: 'AI Influencers', url: '/influencers', icon: Users },
  { title: 'AI Categories', url: '/categories', icon: Folder },
  { title: 'Users', url: '/users', icon: User },
  { title: 'Get In Touch', url: '/contact', icon: Mail },
  { title: 'Manage Users', url: '/manage-users', icon: Settings },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');
  
  const getNavCls = (path: string) =>
    isActive(path)
      ? 'bg-primary text-white font-medium shadow-sm' 
      : 'hover:bg-accent text-muted-foreground hover:text-foreground transition-smooth';

  return (
    <Sidebar className="border-r bg-card transition-smooth" collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                Admin Portal
              </h2>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className='menu-item-sec-value-row'>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls(item.url)}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;