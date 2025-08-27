import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleCategoryStatus, fetchCategories } from '@/store/slices/categoriesSlice';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const CategoriesList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  // const [categories] = useState([
  //   { id: 1, name: 'AI Writing', description: 'Tools for AI-powered writing', itemCount: 25, isActive: true },
  //   { id: 2, name: 'AI Design', description: 'AI design and image generation tools', itemCount: 18, isActive: true },
  //   { id: 3, name: 'AI Development', description: 'AI coding and development tools', itemCount: 32, isActive: true },
  //   { id: 4, name: 'AI Marketing', description: 'AI marketing and advertising tools', itemCount: 15, isActive: false },
  // ]);
  const { categories } = useAppSelector((state) => state.categories);

  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Category Name' },
    { key: 'tagline', label: 'Tag Line' },
    { key: 'status', label: 'status' },
    { key: 'isActive', label: 'isActive' },
  ];
  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 100, search: searchQuery }));
  }, [dispatch, searchQuery]);  
  const handleEdit = (category: any) => {
    navigate(`/categories/edit/${category.id}`);
  };

  const handleView = (category: any) => {
    navigate(`/categories/view/${category.id}`);
  };

  const handleToggleStatus = async (category: any) => {
    try {
      await dispatch(toggleCategoryStatus(category.id)).unwrap();
      toast({
        title: 'Success',
        description: `Category ${category.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update category status',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreate = () => {
    navigate('/categories/create');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Categories</h1>
        <p className="text-muted-foreground">Manage category taxonomy for AI tools and content</p>
      </div>

      <DataTable
        title="AI Categories"
        data={categories}
        columns={columns}
        onEdit={handleEdit}
        onView={handleView}
        onToggleStatus={handleToggleStatus}
        onCreate={handleCreate}
        onSearch={handleSearch}
        isLoading={false}
      />
    </div>
  );
};

export default CategoriesList;