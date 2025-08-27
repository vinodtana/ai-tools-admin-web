import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export interface AINews {
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
  newsLink: string;
  bannerImage: string;
  images?: string[];
  overview: string;
  description?: string;
  review?: string;
  status?: string;
  isActive?: boolean;
  readtime?: number;
  viewsCount?: number;
}

interface NewsState {
  news: AINews[];
  currentNews: AINews | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: NewsState = {
  news: [],
  currentNews: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchNews = createAsyncThunk('news/fetchNews', async (params: any) => {
  const stored = localStorage.getItem('admin_news');
  const news = stored ? JSON.parse(stored) : [];
  return { data: news, pagination: { page: 1, limit: 10, total: news.length } };
});

export const createNews = createAsyncThunk('news/createNews', async (news: AINews) => {
  const stored = localStorage.getItem('admin_news');
  const newsItems = stored ? JSON.parse(stored) : [];
  const newNews = { ...news, id: Date.now().toString(), isActive: true };
  newsItems.push(newNews);
  localStorage.setItem('admin_news', JSON.stringify(newsItems));
  return newNews;
});

export const updateNews = createAsyncThunk('news/updateNews', async ({ id, news }: { id: string; news: AINews }) => {
  const stored = localStorage.getItem('admin_news');
  const newsItems = stored ? JSON.parse(stored) : [];
  const index = newsItems.findIndex((n: AINews) => n.id === id);
  if (index !== -1) {
    newsItems[index] = { ...news, id };
    localStorage.setItem('admin_news', JSON.stringify(newsItems));
  }
  return newsItems[index];
});

export const deleteNews = createAsyncThunk('news/deleteNews', async (id: string) => {
  const stored = localStorage.getItem('admin_news');
  const newsItems = stored ? JSON.parse(stored) : [];
  const filtered = newsItems.filter((n: AINews) => n.id !== id);
  localStorage.setItem('admin_news', JSON.stringify(filtered));
  return id;
});

export const toggleNewsStatus = createAsyncThunk('news/toggleNewsStatus', async (id: string) => {
  const stored = localStorage.getItem('admin_news');
  const newsItems = stored ? JSON.parse(stored) : [];
  const index = newsItems.findIndex((n: AINews) => n.id === id);
  if (index !== -1) {
    newsItems[index].isActive = !newsItems[index].isActive;
    localStorage.setItem('admin_news', JSON.stringify(newsItems));
  }
  return newsItems[index];
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCurrentNews: (state, action) => {
      state.currentNews = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.news.push(action.payload);
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        const index = state.news.findIndex(news => news.id === action.payload.id);
        if (index !== -1) {
          state.news[index] = action.payload;
        }
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.news = state.news.filter(news => news.id !== action.payload);
      })
      .addCase(toggleNewsStatus.fulfilled, (state, action) => {
        const index = state.news.findIndex(news => news.id === action.payload.id);
        if (index !== -1) {
          state.news[index] = action.payload;
        }
      });
  },
});

export const { setCurrentNews, clearError } = newsSlice.actions;
export default newsSlice.reducer;