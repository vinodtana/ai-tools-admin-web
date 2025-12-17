import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchTools, deleteTool, toggleToolStatus } from '@/store/slices/toolsSlice';
import { fetchCategories } from '@/store/slices/categoriesSlice';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const ToolsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { tools, isLoading, pagination } = useAppSelector((state) => state.tools);
  const { categories } = useAppSelector((state) => state.categories);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTools({ page: 1, limit: 10, search: searchQuery }));
    dispatch(fetchCategories({ page: 1, limit: 100, search: searchQuery }));

  }, [dispatch, searchQuery]);
  
  const columns = [
    { key: 'type', label: 'Type' },
    { key: 'name', label: 'Name' },
    { key: 'logo', label: 'Logo' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'companyName', label: 'Company' },
    { key: 'categoryNamesList', label: 'Categories' },
    { key: 'rating', label: 'Rating' },
    { key: 'usersCount', label: 'Users' },
    { key: 'status', label: 'Status Value' },
    { key: 'isActive', label: 'Status' },
  ];

  const handleEdit = (tool: any) => {
    navigate(`/tools/edit/${tool.id}`);
  };

  const handleDelete = async (tool: any) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        await dispatch(deleteTool(tool.id)).unwrap();
        toast({
          title: 'Success',
          description: 'Tool deleted successfully',
        });
        // Refresh the list
        dispatch(fetchTools({ page: pagination.page, limit: pagination.limit, search: searchQuery }));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete tool',
          variant: 'destructive',
        });
      }
    }
  };

  const handleView = (tool: any) => {
    navigate(`/tools/view/${tool.id}`);
  };

  const handleToggleStatus = async (tool: any) => {
    try {
      await dispatch(toggleToolStatus(tool.id)).unwrap();
      toast({
        title: 'Success',
        description: `Tool ${tool.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update tool status',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    dispatch(fetchTools({ page, limit: pagination.limit, search: searchQuery }));
  };

  const handleCreate = () => {
    navigate('/tools/create');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Contents</h1>
        <p className="text-muted-foreground">Manage your AI Contents database</p>
      </div>

      <DataTable
        title="AI Contents"
        data={tools}
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

export default ToolsList;