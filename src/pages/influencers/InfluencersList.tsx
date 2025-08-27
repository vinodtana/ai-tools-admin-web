import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchInfluencers, deleteInfluencer, toggleInfluencerStatus } from '@/store/slices/influencersSlice';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const InfluencersList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { influencers, isLoading } = useAppSelector((state) => state.influencers);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchInfluencers({ page: 1, limit: 10, search: searchQuery }));
  }, [dispatch, searchQuery]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'tagline', label: 'Tagline' },
    { key: 'categories', label: 'Categories' },
    { key: 'rating', label: 'Rating' },
    { key: 'authorLocation', label: 'Location' },
    { key: 'usersCount', label: 'Followers' },
    { key: 'isActive', label: 'Status' },
  ];

  const handleEdit = (influencer: any) => {
    navigate(`/influencers/edit/${influencer.id}`);
  };

  const handleDelete = async (influencer: any) => {
    if (window.confirm('Are you sure you want to delete this influencer?')) {
      try {
        await dispatch(deleteInfluencer(influencer.id)).unwrap();
        toast({
          title: 'Success',
          description: 'Influencer deleted successfully',
        });
        dispatch(fetchInfluencers({ page: 1, limit: 10, search: searchQuery }));
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete influencer',
          variant: 'destructive',
        });
      }
    }
  };

  const handleView = (influencer: any) => {
    navigate(`/influencers/view/${influencer.id}`);
  };

  const handleToggleStatus = async (influencer: any) => {
    try {
      await dispatch(toggleInfluencerStatus(influencer.id)).unwrap();
      toast({
        title: 'Success',
        description: `Influencer ${influencer.isActive ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update influencer status',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreate = () => {
    navigate('/influencers/create');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Influencers</h1>
        <p className="text-muted-foreground">Manage AI influencers and thought leaders</p>
      </div>

      <DataTable
        title="AI Influencers"
        data={influencers}
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

export default InfluencersList;