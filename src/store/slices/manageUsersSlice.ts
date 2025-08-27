import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export interface ManageUser {
  id?: string;
  name?: string;
  email: string;
  phNumber?: string;
  status: string;
  isActive?: boolean;
  role: 'Admin' | 'Editor' | 'Viewer';
}

interface ManageUsersState {
  manageUsers: ManageUser[];
  currentManageUser: ManageUser | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: ManageUsersState = {
  manageUsers: [],
  currentManageUser: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchManageUsers = createAsyncThunk('manageUsers/fetchManageUsers', async (params: any) => {
  const response = await api.get('/manage-users', { params });
  return response.data;
});

export const createManageUser = createAsyncThunk('manageUsers/createManageUser', async (user: ManageUser) => {
  const response = await api.post('/manage-users', user);
  return response.data;
});

export const updateManageUser = createAsyncThunk('manageUsers/updateManageUser', async ({ id, user }: { id: string; user: ManageUser }) => {
  const response = await api.put(`/manage-users/${id}`, user);
  return response.data;
});

export const deleteManageUser = createAsyncThunk('manageUsers/deleteManageUser', async (id: string) => {
  await api.delete(`/manage-users/${id}`);
  return id;
});

const manageUsersSlice = createSlice({
  name: 'manageUsers',
  initialState,
  reducers: {
    setCurrentManageUser: (state, action) => {
      state.currentManageUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManageUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchManageUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.manageUsers = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchManageUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch manage users';
      });
  },
});

export const { setCurrentManageUser, clearError } = manageUsersSlice.actions;
export default manageUsersSlice.reducer;