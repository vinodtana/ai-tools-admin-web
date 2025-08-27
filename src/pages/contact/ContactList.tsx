import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import DataTable from '@/components/common/DataTable';
import { useToast } from '@/hooks/use-toast';

const ContactList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [contacts] = useState([
    { id: 1, name: 'Alice Cooper', email: 'alice@example.com', subject: 'Feature Request', status: 'Open', date: '2024-01-15' },
    { id: 2, name: 'Mike Wilson', email: 'mike@example.com', subject: 'Bug Report', status: 'Closed', date: '2024-02-20' },
    { id: 3, name: 'Sarah Davis', email: 'sarah@example.com', subject: 'General Inquiry', status: 'In Progress', date: '2024-03-10' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'subject', label: 'Subject' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ];

  const handleEdit = (contact: any) => {
    navigate(`/contact/edit/${contact.id}`);
  };

  const handleView = (contact: any) => {
    navigate(`/contact/view/${contact.id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Get In Touch</h1>
        <p className="text-muted-foreground">Manage contact requests and inquiries</p>
      </div>

      <DataTable
        title="Contact Messages"
        data={contacts}
        columns={columns}
        onEdit={handleEdit}
        onView={handleView}
        onSearch={handleSearch}
        isLoading={false}
      />
    </div>
  );
};

export default ContactList;