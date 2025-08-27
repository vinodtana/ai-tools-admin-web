import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export interface User {
  id?: string;
  email?: string;
  phone?: string;
  enableEmailNotifications?: boolean;
  enableWeeklyNewsletter?: boolean;
  password?: string;
  source?: string;
}

interface UsersState {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (params: any) => {
  const response = await api.get('/users', { params });
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (user: User) => {
  const response = await api.post('/users', user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }: { id: string; user: User }) => {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
  await api.delete(`/users/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setCurrentUser, clearError } = usersSlice.actions;
export default usersSlice.reducer;