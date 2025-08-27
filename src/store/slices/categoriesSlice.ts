import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { SERVER_IP } from "../../config";
import { post, put, get } from "../../library/Requests/helpers";
export interface AICategory {
  id?: string;
  name?: string;
  tagline?: string;
  logo?: string;
  status?: string;
  isActive?: boolean;
}

interface CategoriesState {
  categories: AICategory[];
  currentCategory: AICategory | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: CategoriesState = {
  categories: [],
  currentCategory: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (params: any) => {
  const response = await api.get(`${SERVER_IP}/categories`, { params });
  return response.data;
});

export const createCategory = createAsyncThunk('categories/createCategory', async (category: AICategory) => {
  const response = await api.post('/categories', category);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, category }: { id: string; category: AICategory }) => {
  const response = await api.put(`/categories/${id}`, category);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: string) => {
  const stored = localStorage.getItem('admin_categories');
  const categories = stored ? JSON.parse(stored) : [];
  const filtered = categories.filter((c: AICategory) => c.id !== id);
  localStorage.setItem('admin_categories', JSON.stringify(filtered));
  return id;
});

export const toggleCategoryStatus = createAsyncThunk('categories/toggleCategoryStatus', async (id: string) => {
  const stored = localStorage.getItem('admin_categories');
  const categories = stored ? JSON.parse(stored) : [];
  const index = categories.findIndex((c: AICategory) => c.id === id);
  if (index !== -1) {
    categories[index].isActive = !categories[index].isActive;
    localStorage.setItem('admin_categories', JSON.stringify(categories));
  }
  return categories[index];
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log('Fetched categories:', action.payload);
        state.categories = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export const { setCurrentCategory, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;