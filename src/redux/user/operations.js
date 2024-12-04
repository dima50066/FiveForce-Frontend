import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from '../../utils/axiosConfig';

export const login = createAsyncThunk(
  'user/login',
  async (userInfo, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/login', userInfo);
      const { token, user } = response.data;
      setAuthHeader(token);
      return { user, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (userInfo, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/register', userInfo);
      const { user } = response.data;
      return { user };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Logout failed'
    );
  }
});

export const refreshSession = createAsyncThunk(
  'user/refreshSession',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/refresh');
      const { token } = response.data.data;
      setAuthHeader(token);
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to refresh session');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/refreshUser',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to refresh user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch('/users/current', updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update user'
      );
    }
  }
);

export const requestPasswordResetEmail = createAsyncThunk(
  'user/requestPasswordReset',
  async (email, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/reset-email', email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to reset password'
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/reset-password', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to reset password'
      );
    }
  }
);

export const fetchUsersCount = createAsyncThunk(
  'user/fetchUsersCount',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/count');
      return response.data.countUsers;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch users count');
    }
  }
);

export const getGoogleOAuthUrl = createAsyncThunk(
  'user/getGoogleOAuthUrl',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/get-oauth-url');
      return response.data.data.url;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get Google OAuth URL'
      );
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (code, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/confirm-oauth', {
        code,
      });
      const { token } = response.data.data;
      setAuthHeader(token);
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Google login failed'
      );
    }
  }
);
