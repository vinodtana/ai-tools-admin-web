import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { SERVER_IP } from "../../config";
import { post, put, get } from "../../library/Requests/helpers";

export interface AITool {
  id?: string;
  name: string;
  tagline: string;
  logo?: string;
  categories: string[];
  Type?: string;
  planType?: string;
  type?: string;
  usersCount?: string;
  rating: number;
  authorBy: string;
  authorLink?: string;
  authorRole?: string;
  authorLocation?: string;
  companyName: string;
  toolUrl: string;
  price?: string;
  bannerImage: string;
  images?: string[];
  status?: string;
  isActive?: boolean;
  readtime?: string;
  launchDate?: string;
  viewsCount?: string;
  overview: string;
  description: string;
  features: string[];
  useCases?: string[];
  toolPros?: string[];
  toolCons?: string[];
  keyAchievements?: string[];
  howToUse?: string;
  promptTemplate?: string;
  newslink?: string;
  videoUrl?: string;
}

interface ToolsState {
  tools: AITool[];
  currentTool: AITool | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: ToolsState = {
  tools: [],
  currentTool: null,
  isLoading: false,
  error: null,
  pagination: { page: 1, limit: 10, total: 0 },
};

export const fetchTools = createAsyncThunk('tools/fetchTools', async (params: any) => {
  return await get(`${SERVER_IP}/contents`);
});

export const createTool = createAsyncThunk('tools/createTool', async (tool: AITool) => {
  return await post(`${SERVER_IP}/contents`, tool);
});

export const fetchToolById = createAsyncThunk('tools/fetchToolById', async (id: any) => {
  return await get(`${SERVER_IP}/contents/${id}`);
});
export const getPresignedURL = createAsyncThunk('tools/getPresignedURL', async (tool: AITool) => {
  return await post(`${SERVER_IP}/contents/get-presigned-url`, tool);
});


export const updateTool = createAsyncThunk('tools/updateTool', async ({ id, tool }: { id: string; tool: AITool }) => {
  // const stored = localStorage.getItem('admin_tools');
  // const tools = stored ? JSON.parse(stored) : [];
  // const index = tools.findIndex((t: AITool) => t.id === id);
  // if (index !== -1) {
  //   tools[index] = { ...tool, id };
  //   localStorage.setItem('admin_tools', JSON.stringify(tools));
  // }
  return await put(`${SERVER_IP}/contents/${id}`, tool);
  // return tools[index];
});

export const deleteTool = createAsyncThunk('tools/deleteTool', async (id: string) => {
  const stored = localStorage.getItem('admin_tools');
  const tools = stored ? JSON.parse(stored) : [];
  const filtered = tools.filter((t: AITool) => t.id !== id);
  localStorage.setItem('admin_tools', JSON.stringify(filtered));
  return id;
});

export const toggleToolStatus = createAsyncThunk('tools/toggleToolStatus', async (id: string) => {
  const stored = localStorage.getItem('admin_tools');
  const tools = stored ? JSON.parse(stored) : [];
  const index = tools.findIndex((t: AITool) => t.id === id);
  if (index !== -1) {
    tools[index].isActive = !tools[index].isActive;
    localStorage.setItem('admin_tools', JSON.stringify(tools));
  }
  return tools[index];
});

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setCurrentTool: (state, action) => {
      state.currentTool = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tools = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTools.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch tools';
      })
      .addCase(createTool.fulfilled, (state, action) => {
        state.tools.push(action.payload);
      })
      .addCase(updateTool.fulfilled, (state, action) => {
        const index = state.tools.findIndex(tool => tool.id === action.payload.id);
        if (index !== -1) {
          state.tools[index] = action.payload;
        }
      })
      .addCase(deleteTool.fulfilled, (state, action) => {
        state.tools = state.tools.filter(tool => tool.id !== action.payload);
      })
      .addCase(toggleToolStatus.fulfilled, (state, action) => {
        const index = state.tools.findIndex(tool => tool.id === action.payload.id);
        if (index !== -1) {
          state.tools[index] = action.payload;
        }
      });
  },
});

export const { setCurrentTool, clearError } = toolsSlice.actions;
export default toolsSlice.reducer;