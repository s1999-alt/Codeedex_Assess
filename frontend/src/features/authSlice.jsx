import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../src/api';

const initialState = {
  user: null,
  token: localStorage.getItem('accessToken') || null,
  status: 'idle',
  error: null
};

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  const res = await API.post('/auth/register/', data);
  return res.data;
});

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  const res = await API.post('/auth/login/', data);

  localStorage.setItem('accessToken', res.data.access);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('accessToken');
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.access;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
