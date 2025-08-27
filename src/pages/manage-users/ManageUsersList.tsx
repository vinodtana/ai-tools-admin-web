import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const ManageUsersList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [adminUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Super Admin', permissions: ['All'], lastLogin: '2024-01-15', isActive: true },
    { id: 2, name: 'Editor User', email: 'editor@example.com', role: 'Editor', permissions: ['Create', 'Edit'], lastLogin: '2024-02-20', isActive: true },
    { id: 3, name: 'Moderator', email: 'mod@example.com', role: 'Moderator', permissions: ['View', 'Moderate'], lastLogin: '2024-03-10', isActive: false },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'permissions', label: 'Permissions' },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'isActive', label: 'Status' },
  ];

  const handleEdit = (user: any) => {
    navigate(`/manage-users/edit/${user.id}`);
  };

  const handleView = (user: any) => {
    navigate(`/manage-users/view/${user.id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreate = () => {
    navigate('/manage-users/create');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground">Manage admin users and their permissions</p>
      </div>

      <DataTable
        title="Admin Users"
        data={adminUsers}
        columns={columns}
        onEdit={handleEdit}
        onView={handleView}
        onCreate={handleCreate}
        onSearch={handleSearch}
        isLoading={false}
      />
    </div>
  );
};

export default ManageUsersList;