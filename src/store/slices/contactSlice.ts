import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export interface Contact {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

interface ContactState {
  contacts: Contact[];
  currentContact: Contact | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: ContactState = {
  contacts: [],
  currentContact: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchContacts = createAsyncThunk('contact/fetchContacts', async (params: any) => {
  const response = await api.get('/contacts', { params });
  return response.data;
});

export const createContact = createAsyncThunk('contact/createContact', async (contact: Contact) => {
  const response = await api.post('/contacts', contact);
  return response.data;
});

export const updateContact = createAsyncThunk('contact/updateContact', async ({ id, contact }: { id: string; contact: Contact }) => {
  const response = await api.put(`/contacts/${id}`, contact);
  return response.data;
});

export const deleteContact = createAsyncThunk('contact/deleteContact', async (id: string) => {
  await api.delete(`/contacts/${id}`);
  return id;
});

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      });
  },
});

export const { setCurrentContact, clearError } = contactSlice.actions;
export default contactSlice.reducer;