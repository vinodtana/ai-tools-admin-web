import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { SERVER_IP } from "../../config";
import { post, put, get } from "../../library/Requests/helpers";


interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
const userData: string | null = localStorage.getItem("user");

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isLoading: false,
  user: userData !== null ? JSON.parse(userData) : {},

  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    // No validation - accept any email/password
    return await post(`${SERVER_IP}/auth/signin`, {email, password});

    // const token = 'mock-token-' + Date.now();
    // localStorage.setItem('auth_token', token);
    // localStorage.setItem('auth_email', email);
    // return { token, user };
  }
);
// http://localhost:3000/api

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return null;
});

export const checkSocialUserAPI = createAsyncThunk(
  "auth/checkSocialUserAPI",
  async (body: any) => await post(`${SERVER_IP}/api/v1/auth/google`, body)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Login successful:', action.payload);
        const uData = {...action.payload?.data?.user, token: action.payload?.data.token};
        state.user = uData;
        state.token = action.payload?.data.token;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(uData));
        localStorage.setItem('token', action.payload?.data.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;