import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';

export interface AIArticle {
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
  description: string;
  review?: string;
  status?: string;
  isActive?: boolean;
  readtime: number;
  viewsCount?: number;
}

interface ArticlesState {
  articles: AIArticle[];
  currentArticle: AIArticle | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (params: any) => {
  const stored = localStorage.getItem('admin_articles');
  const articles = stored ? JSON.parse(stored) : [];
  return { data: articles, pagination: { page: 1, limit: 10, total: articles.length } };
});

export const createArticle = createAsyncThunk('articles/createArticle', async (article: AIArticle) => {
  const stored = localStorage.getItem('admin_articles');
  const articles = stored ? JSON.parse(stored) : [];
  const newArticle = { ...article, id: Date.now().toString(), isActive: true };
  articles.push(newArticle);
  localStorage.setItem('admin_articles', JSON.stringify(articles));
  return newArticle;
});

export const updateArticle = createAsyncThunk('articles/updateArticle', async ({ id, article }: { id: string; article: AIArticle }) => {
  const stored = localStorage.getItem('admin_articles');
  const articles = stored ? JSON.parse(stored) : [];
  const index = articles.findIndex((a: AIArticle) => a.id === id);
  if (index !== -1) {
    articles[index] = { ...article, id };
    localStorage.setItem('admin_articles', JSON.stringify(articles));
  }
  return articles[index];
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id: string) => {
  const stored = localStorage.getItem('admin_articles');
  const articles = stored ? JSON.parse(stored) : [];
  const filtered = articles.filter((a: AIArticle) => a.id !== id);
  localStorage.setItem('admin_articles', JSON.stringify(filtered));
  return id;
});

export const toggleArticleStatus = createAsyncThunk('articles/toggleArticleStatus', async (id: string) => {
  const stored = localStorage.getItem('admin_articles');
  const articles = stored ? JSON.parse(stored) : [];
  const index = articles.findIndex((a: AIArticle) => a.id === id);
  if (index !== -1) {
    articles[index].isActive = !articles[index].isActive;
    localStorage.setItem('admin_articles', JSON.stringify(articles));
  }
  return articles[index];
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(article => article.id !== action.payload);
      })
      .addCase(toggleArticleStatus.fulfilled, (state, action) => {
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      });
  },
});

export const { setCurrentArticle, clearError } = articlesSlice.actions;
export default articlesSlice.reducer;