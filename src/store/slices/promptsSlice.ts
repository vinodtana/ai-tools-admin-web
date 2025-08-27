import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export interface ChatGPTPrompt {
  id?: string;
  name: string;
  tagline: string;
  logo?: string;
  categories: string[];
  usersCount?: number;
  rating: number;
  authorBy?: string;
  authorLink?: string;
  authorRole?: string;
  bannerImage: string;
  images?: string[];
  overview: string;
  useCases: string[];
  howToUse?: string;
  review?: string;
  status?: string;
  isActive?: boolean;
  promptTemplate: string;
  readtime?: number;
  viewsCount?: number;
}

interface PromptsState {
  prompts: ChatGPTPrompt[];
  currentPrompt: ChatGPTPrompt | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: PromptsState = {
  prompts: [],
  currentPrompt: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchPrompts = createAsyncThunk('prompts/fetchPrompts', async (params: any) => {
  const stored = localStorage.getItem('admin_prompts');
  const prompts = stored ? JSON.parse(stored) : [];
  return { data: prompts, pagination: { page: 1, limit: 10, total: prompts.length } };
});

export const createPrompt = createAsyncThunk('prompts/createPrompt', async (prompt: ChatGPTPrompt) => {
  const stored = localStorage.getItem('admin_prompts');
  const prompts = stored ? JSON.parse(stored) : [];
  const newPrompt = { ...prompt, id: Date.now().toString(), isActive: true };
  prompts.push(newPrompt);
  localStorage.setItem('admin_prompts', JSON.stringify(prompts));
  return newPrompt;
});

export const updatePrompt = createAsyncThunk('prompts/updatePrompt', async ({ id, prompt }: { id: string; prompt: ChatGPTPrompt }) => {
  const stored = localStorage.getItem('admin_prompts');
  const prompts = stored ? JSON.parse(stored) : [];
  const index = prompts.findIndex((p: ChatGPTPrompt) => p.id === id);
  if (index !== -1) {
    prompts[index] = { ...prompt, id };
    localStorage.setItem('admin_prompts', JSON.stringify(prompts));
  }
  return prompts[index];
});

export const deletePrompt = createAsyncThunk('prompts/deletePrompt', async (id: string) => {
  const stored = localStorage.getItem('admin_prompts');
  const prompts = stored ? JSON.parse(stored) : [];
  const filtered = prompts.filter((p: ChatGPTPrompt) => p.id !== id);
  localStorage.setItem('admin_prompts', JSON.stringify(filtered));
  return id;
});

export const togglePromptStatus = createAsyncThunk('prompts/togglePromptStatus', async (id: string) => {
  const stored = localStorage.getItem('admin_prompts');
  const prompts = stored ? JSON.parse(stored) : [];
  const index = prompts.findIndex((p: ChatGPTPrompt) => p.id === id);
  if (index !== -1) {
    prompts[index].isActive = !prompts[index].isActive;
    localStorage.setItem('admin_prompts', JSON.stringify(prompts));
  }
  return prompts[index];
});

const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {
    setCurrentPrompt: (state, action) => {
      state.currentPrompt = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prompts = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch prompts';
      })
      .addCase(createPrompt.fulfilled, (state, action) => {
        state.prompts.push(action.payload);
      })
      .addCase(updatePrompt.fulfilled, (state, action) => {
        const index = state.prompts.findIndex(prompt => prompt.id === action.payload.id);
        if (index !== -1) {
          state.prompts[index] = action.payload;
        }
      })
      .addCase(deletePrompt.fulfilled, (state, action) => {
        state.prompts = state.prompts.filter(prompt => prompt.id !== action.payload);
      })
      .addCase(togglePromptStatus.fulfilled, (state, action) => {
        const index = state.prompts.findIndex(prompt => prompt.id === action.payload.id);
        if (index !== -1) {
          state.prompts[index] = action.payload;
        }
      });
  },
});

export const { setCurrentPrompt, clearError } = promptsSlice.actions;
export default promptsSlice.reducer;