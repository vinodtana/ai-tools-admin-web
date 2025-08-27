import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchArticles, deleteArticle, toggleArticleStatus } from '@/store/slices/articlesSlice';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const ArticlesList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { articles, isLoading, pagination } = useAppSelector((state) => state.articles);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchArticles({ page: 1, limit: 10, search: searchQuery }));
  }, [dispatch, searchQuery]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'categories', label: 'Categories' },
    { key: 'rating', label: 'Rating' },
    { key: 'authorBy', label: 'Author' },
    { key: 'readtime', label: 'Read Time' },
    { key: 'isActive', label: 'Status' },
  ];

  const handleEdit = (article: any) => {
    navigate(`/articles/edit/${article.id}`);
  };

  const handleDelete = async (article: any) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await dispatch(deleteArticle(article.id)).unwrap();
        toast({
          title: 'Success',
          description: 'Article deleted successfully',
        });
        dispatch(fetchArticles({ page: pagination.page, limit: pagination.limit, search: searchQuery }));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete article',
          variant: 'destructive',
        });
      }
    }
  };

  const handleView = (article: any) => {
    navigate(`/articles/view/${article.id}`);
  };

  const handleToggleStatus = async (article: any) => {
    try {
      await dispatch(toggleArticleStatus(article.id)).unwrap();
      toast({
        title: 'Success',
        description: `Article ${article.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update article status',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchArticles({ page, limit: pagination.limit, search: searchQuery }));
  };

  const handleCreate = () => {
    navigate('/articles/create');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Articles</h1>
        <p className="text-muted-foreground">Manage your AI articles collection</p>
      </div>

      <DataTable
        title="AI Articles"
        data={articles}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onToggleStatus={handleToggleStatus}
        onCreate={handleCreate}
        onSearch={handleSearch}
        isLoading={isLoading}
        pagination={{
          ...pagination,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default ArticlesList;