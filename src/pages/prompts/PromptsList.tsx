import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPrompts, deletePrompt, togglePromptStatus } from '@/store/slices/promptsSlice';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const PromptsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { prompts, isLoading, pagination } = useAppSelector((state) => state.prompts);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchPrompts({ page: 1, limit: 10, search: searchQuery }));
  }, [dispatch, searchQuery]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'categories', label: 'Categories' },
    { key: 'rating', label: 'Rating' },
    { key: 'authorBy', label: 'Author' },
    { key: 'isActive', label: 'Status' },
  ];

  const handleEdit = (prompt: any) => {
    navigate(`/prompts/edit/${prompt.id}`);
  };

  const handleDelete = async (prompt: any) => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await dispatch(deletePrompt(prompt.id)).unwrap();
        toast({
          title: 'Success',
          description: 'Prompt deleted successfully',
        });
        dispatch(fetchPrompts({ page: pagination.page, limit: pagination.limit, search: searchQuery }));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete prompt',
          variant: 'destructive',
        });
      }
    }
  };

  const handleView = (prompt: any) => {
    navigate(`/prompts/view/${prompt.id}`);
  };

  const handleToggleStatus = async (prompt: any) => {
    try {
      await dispatch(togglePromptStatus(prompt.id)).unwrap();
      toast({
        title: 'Success',
        description: `Prompt ${prompt.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update prompt status',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchPrompts({ page, limit: pagination.limit, search: searchQuery }));
  };

  const handleCreate = () => {
    navigate('/prompts/create');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">ChatGPT Prompts</h1>
        <p className="text-muted-foreground">Manage your ChatGPT prompts collection</p>
      </div>

      <DataTable
        title="ChatGPT Prompts"
        data={prompts}
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

export default PromptsList;