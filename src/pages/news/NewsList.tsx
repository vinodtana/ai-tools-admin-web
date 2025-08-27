import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchNews, deleteNews, toggleNewsStatus } from '@/store/slices/newsSlice';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const NewsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { news, isLoading } = useAppSelector((state) => state.news);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchNews({ page: 1, limit: 10, search: searchQuery }));
  }, [dispatch, searchQuery]);

  const columns = [
    { key: 'name', label: 'Title' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'categories', label: 'Categories' },
    { key: 'rating', label: 'Rating' },
    { key: 'readtime', label: 'Read Time' },
    { key: 'viewsCount', label: 'Views' },
    { key: 'isActive', label: 'Status' },
  ];

  const handleEdit = (news: any) => {
    navigate(`/news/edit/${news.id}`);
  };

  const handleDelete = async (news: any) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await dispatch(deleteNews(news.id)).unwrap();
        toast({
          title: 'Success',
          description: 'News deleted successfully',
        });
        dispatch(fetchNews({ page: 1, limit: 10, search: searchQuery }));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete news',
          variant: 'destructive',
        });
      }
    }
  };

  const handleView = (news: any) => {
    navigate(`/news/view/${news.id}`);
  };

  const handleToggleStatus = async (news: any) => {
    try {
      await dispatch(toggleNewsStatus(news.id)).unwrap();
      toast({
        title: 'Success',
        description: `News ${news.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update news status',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreate = () => {
    navigate('/news/create');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI News</h1>
        <p className="text-muted-foreground">Manage AI news articles and updates</p>
      </div>

      <DataTable
        title="AI News"
        data={news}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onToggleStatus={handleToggleStatus}
        onCreate={handleCreate}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NewsList;