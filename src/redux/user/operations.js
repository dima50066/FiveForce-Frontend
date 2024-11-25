import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from '../../API/axiosInstance';

export const login = createAsyncThunk(
  'user/login',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/api/users/login', userInfo);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      const response = {
        message: error.response?.data?.message || 'Unknown error',
        statusCode: error.response?.status || 500,
      };

      if (
        response.statusCode === 401 &&
        response.message === 'Please verify your email'
      ) {
        return thunkAPI.rejectWithValue({
          ...response,
          customMessage: 'Please verify your email',
        });
      } else if (response.statusCode === 401) {
        return thunkAPI.rejectWithValue({
          ...response,
          customMessage: 'Email or password is wrong',
        });
      }

      return thunkAPI.rejectWithValue({
        ...response,
        customMessage: 'Login failed',
      });
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (userInfo, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        '/api/users/register',
        userInfo
      );
      return data;
    } catch (error) {
      const response = {
        message: error.response?.data?.message || 'Unknown error',
        statusCode: error.response?.status || 500,
      };

      if (response.statusCode === 409) {
        return thunkAPI.rejectWithValue({
          ...response,
          customMessage: 'This email is already used',
        });
      }

      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post('/api/users/logout');
    clearAuthHeader();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUserToken = createAsyncThunk(
  'user/refreshUserToken',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth?.refreshToken;
    if (!token) {
      throw new Error('Empty refresh token');
    }

    try {
      const { data } = await axiosInstance.get('/api/users/refresh', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Refresh failed'
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/api/users/current');
      return data;
    } catch (error) {
      const response = {
        message: error.response?.data?.message || 'Unknown error',
        statusCode: error.response?.status || 500,
      };
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/users/${userData._id}`,
        userData
      );
      return data;
    } catch (error) {
      const response = {
        message: error.response?.data?.message || 'Unknown error',
        statusCode: error.response?.status || 500,
      };
      return thunkAPI.rejectWithValue(response);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (avatarFile, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().auth?.user?._id;
      const { data } = await axiosInstance.put(
        `/api/users/${userId}`,
        avatarFile,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Avatar update failed'
      );
    }
  }
);
