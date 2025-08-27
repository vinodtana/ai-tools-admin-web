import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import toolsSlice from './slices/toolsSlice';
import promptsSlice from './slices/promptsSlice';
import articlesSlice from './slices/articlesSlice';
import newsSlice from './slices/newsSlice';
import influencersSlice from './slices/influencersSlice';
import categoriesSlice from './slices/categoriesSlice';
import usersSlice from './slices/usersSlice';
import contactSlice from './slices/contactSlice';
import manageUsersSlice from './slices/manageUsersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tools: toolsSlice,
    prompts: promptsSlice,
    articles: articlesSlice,
    news: newsSlice,
    influencers: influencersSlice,
    categories: categoriesSlice,
    users: usersSlice,
    contact: contactSlice,
    manageUsers: manageUsersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;