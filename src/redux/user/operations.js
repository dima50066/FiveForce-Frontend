import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from '../../utils/axiosConfig';

export const login = createAsyncThunk(
  'user/login',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/users/login', userInfo);
      setAuthHeader(data.token);
      return {
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || 'Invalid credentials',
        status: error.response?.status || 400,
      });
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/users/register', userInfo);
      setAuthHeader(data.token);
      return {
        token: data.token,
        user: data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || 'Registration failed',
        status: error.response?.status || 400,
      });
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/users/logout');
    clearAuthHeader();
    return {};
  } catch (error) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || 'Logout failed',
    });
  }
});

export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth?.refreshToken;
    if (!token) {
      return thunkAPI.rejectWithValue('Missing refresh token');
    }

    try {
      const { data } = await axiosInstance.get('/users/current', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || 'Failed to refresh token',
      });
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || 'Failed to fetch user',
        status: error.response?.status || 400,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch('/users/current', updateData);
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || 'Failed to update user',
        status: error.response?.status || 400,
      });
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (avatarFile, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth?.user?._id;
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const { data } = await axiosInstance.patch(
        `/users/${userId}/avatar`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || 'Failed to update avatar',
      });
    }
  }
);
