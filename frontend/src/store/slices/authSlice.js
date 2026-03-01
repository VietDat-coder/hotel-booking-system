import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const tokenKey = 'hb_token';

const initialToken = localStorage.getItem(tokenKey);

export const loginThunk = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const data = await authService.login(payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.message || 'Login failed');
  }
});

export const registerThunk = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const data = await authService.register(payload);
    return data;
  } catch (err) {
    return rejectWithValue(err.message || 'Register failed');
  }
});

export const fetchMeThunk = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const data = await authService.me();
    return data;
  } catch (err) {
    return rejectWithValue(err.message || 'Fetch profile failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken || null,
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem(tokenKey);
    },
    setToken(state, action) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem(tokenKey, action.payload);
      } else {
        localStorage.removeItem(tokenKey);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem(tokenKey, action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  }
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;

