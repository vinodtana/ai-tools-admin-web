import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', joinDate: '2024-01-15', isActive: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Premium', joinDate: '2024-02-20', isActive: true },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', joinDate: '2024-03-10', isActive: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'joinDate', label: 'Join Date' },
    { key: 'isActive', label: 'Status' },
  ];

  const handleEdit = (user: any) => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleView = (user: any) => {
    navigate(`/users/view/${user.id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground">Manage registered users and their profiles</p>
      </div>

      <DataTable
        title="Users"
        data={users}
        columns={columns}
        onEdit={handleEdit}
        onView={handleView}
        onSearch={handleSearch}
        isLoading={false}
      />
    </div>
  );
};

export default UsersList;