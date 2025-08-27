import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export interface AIInfluencer {
  id?: string;
  name: string;
  tagline: string;
  logo?: string;
  categories: string[];
  usersCount?: number;
  rating: number;
  authorBy?: string;
  authorLink?: string;
  authorLocation?: string;
  authorRole?: string;
  bannerImage?: string;
  images?: string[];
  videoUrl?: string;
  overview?: string;
  description?: string;
  keyAchievements?: string;
  review?: string;
  status?: string;
  recentActivities?: string;
  isActive?: boolean;
  socialMediaLinks?: string[];
}

interface InfluencersState {
  influencers: AIInfluencer[];
  currentInfluencer: AIInfluencer | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: InfluencersState = {
  influencers: [],
  currentInfluencer: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchInfluencers = createAsyncThunk('influencers/fetchInfluencers', async (params: any) => {
  const stored = localStorage.getItem('admin_influencers');
  const influencers = stored ? JSON.parse(stored) : [];
  return { data: influencers, pagination: { page: 1, limit: 10, total: influencers.length } };
});

export const createInfluencer = createAsyncThunk('influencers/createInfluencer', async (influencer: AIInfluencer) => {
  const stored = localStorage.getItem('admin_influencers');
  const influencers = stored ? JSON.parse(stored) : [];
  const newInfluencer = { ...influencer, id: Date.now().toString(), isActive: true };
  influencers.push(newInfluencer);
  localStorage.setItem('admin_influencers', JSON.stringify(influencers));
  return newInfluencer;
});

export const updateInfluencer = createAsyncThunk('influencers/updateInfluencer', async ({ id, influencer }: { id: string; influencer: AIInfluencer }) => {
  const stored = localStorage.getItem('admin_influencers');
  const influencers = stored ? JSON.parse(stored) : [];
  const index = influencers.findIndex((i: AIInfluencer) => i.id === id);
  if (index !== -1) {
    influencers[index] = { ...influencer, id };
    localStorage.setItem('admin_influencers', JSON.stringify(influencers));
  }
  return influencers[index];
});

export const deleteInfluencer = createAsyncThunk('influencers/deleteInfluencer', async (id: string) => {
  const stored = localStorage.getItem('admin_influencers');
  const influencers = stored ? JSON.parse(stored) : [];
  const filtered = influencers.filter((i: AIInfluencer) => i.id !== id);
  localStorage.setItem('admin_influencers', JSON.stringify(filtered));
  return id;
});

export const toggleInfluencerStatus = createAsyncThunk('influencers/toggleInfluencerStatus', async (id: string) => {
  const stored = localStorage.getItem('admin_influencers');
  const influencers = stored ? JSON.parse(stored) : [];
  const index = influencers.findIndex((i: AIInfluencer) => i.id === id);
  if (index !== -1) {
    influencers[index].isActive = !influencers[index].isActive;
    localStorage.setItem('admin_influencers', JSON.stringify(influencers));
  }
  return influencers[index];
});

const influencersSlice = createSlice({
  name: 'influencers',
  initialState,
  reducers: {
    setCurrentInfluencer: (state, action) => {
      state.currentInfluencer = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfluencers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInfluencers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.influencers = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchInfluencers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch influencers';
      })
      .addCase(createInfluencer.fulfilled, (state, action) => {
        state.influencers.push(action.payload);
      })
      .addCase(updateInfluencer.fulfilled, (state, action) => {
        const index = state.influencers.findIndex(influencer => influencer.id === action.payload.id);
        if (index !== -1) {
          state.influencers[index] = action.payload;
        }
      })
      .addCase(deleteInfluencer.fulfilled, (state, action) => {
        state.influencers = state.influencers.filter(influencer => influencer.id !== action.payload);
      })
      .addCase(toggleInfluencerStatus.fulfilled, (state, action) => {
        const index = state.influencers.findIndex(influencer => influencer.id === action.payload.id);
        if (index !== -1) {
          state.influencers[index] = action.payload;
        }
      });
  },
});

export const { setCurrentInfluencer, clearError } = influencersSlice.actions;
export default influencersSlice.reducer;