import { Provider } from 'react-redux';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import store from './store';
import LoginPage from './components/auth/LoginPage';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import ToolsList from './pages/tools/ToolsList';
import ToolForm from './pages/tools/ToolForm';
import ToolView from './pages/tools/ToolView';
import PromptsList from './pages/prompts/PromptsList';
import PromptForm from './pages/prompts/PromptForm';
import PromptView from './pages/prompts/PromptView';
import ArticlesList from './pages/articles/ArticlesList';
import ArticleForm from './pages/articles/ArticleForm';
import ArticleView from './pages/articles/ArticleView';
import NewsList from './pages/news/NewsList';
import NewsForm from './pages/news/NewsForm';
import NewsView from './pages/news/NewsView';
import InfluencersList from './pages/influencers/InfluencersList';
import InfluencerForm from './pages/influencers/InfluencerForm';
import InfluencerView from './pages/influencers/InfluencerView';
import CategoriesList from './pages/categories/CategoriesList';
import CategoryForm from './pages/categories/CategoryForm';
import CategoryView from './pages/categories/CategoryView';
import UsersList from './pages/users/UsersList';
import ContactList from './pages/contact/ContactList';
import ManageUsersList from './pages/manage-users/ManageUsersList';
import ManageUserForm from './pages/manage-users/ManageUserForm';
import ManageUserView from './pages/manage-users/ManageUserView';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="light">
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tools" element={<ToolsList />} />
              <Route path="contents" element={<ToolsList />} />
              
              <Route path="tools/create" element={<ToolForm mode="create" />} />
              <Route path="tools/edit/:id" element={<ToolForm mode="edit" />} />
              <Route path="tools/view/:id" element={<ToolView />} />
              
              <Route path="prompts" element={<PromptsList />} />
              <Route path="prompts/create" element={<PromptForm mode="create" />} />
              <Route path="prompts/edit/:id" element={<PromptForm mode="edit" />} />
              <Route path="prompts/view/:id" element={<PromptView />} />
              
              <Route path="articles" element={<ArticlesList />} />
              <Route path="articles/create" element={<ArticleForm mode="create" />} />
              <Route path="articles/edit/:id" element={<ArticleForm mode="edit" />} />
              <Route path="articles/view/:id" element={<ArticleView />} />
              
              <Route path="news" element={<NewsList />} />
              <Route path="news/create" element={<NewsForm />} />
              <Route path="news/edit/:id" element={<NewsForm />} />
              <Route path="news/view/:id" element={<NewsView />} />
              
              <Route path="influencers" element={<InfluencersList />} />
              <Route path="influencers/create" element={<InfluencerForm />} />
              <Route path="influencers/edit/:id" element={<InfluencerForm />} />
              <Route path="influencers/view/:id" element={<InfluencerView />} />
              
              <Route path="categories" element={<CategoriesList />} />
              <Route path="categories/create" element={<CategoryForm />} />
              <Route path="categories/edit/:id" element={<CategoryForm />} />
              <Route path="categories/view/:id" element={<CategoryView />} />
              
              <Route path="users" element={<UsersList />} />
              <Route path="contact" element={<ContactList />} />
              
              <Route path="manage-users" element={<ManageUsersList />} />
              <Route path="manage-users/create" element={<ManageUserForm />} />
              <Route path="manage-users/edit/:id" element={<ManageUserForm />} />
              <Route path="manage-users/view/:id" element={<ManageUserView />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
