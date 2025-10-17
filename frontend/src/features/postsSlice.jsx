import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/api';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await API.get('/posts/');
  return res.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (data) => {
  const res = await API.post('/posts/', data);
  return res.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  }
});

export default postsSlice.reducer;
