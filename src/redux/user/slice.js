import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  register,
  logout,
  fetchUser,
  updateUser,
  requestPasswordResetEmail,
  resetPassword,
  fetchUsersCount,
  getGoogleOAuthUrl,
  loginWithGoogle,
  refreshSession,
} from './operations';

const initialState = {
  user: null,
  isLoggedIn: !!localStorage.getItem('token'),
  isLoading: false,
  isRefreshing: false,
  error: null,
  usersCount: 0,
  googleOAuthUrl: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isRefreshing = false;
      state.error = null;
    },
    resetError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Logout
      .addCase(logout.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Fetch User
      .addCase(fetchUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Update User
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Request Password Reset Email
      .addCase(requestPasswordResetEmail.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordResetEmail.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(requestPasswordResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Reset Password
      .addCase(resetPassword.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })
      // Fetch Users Count
      .addCase(fetchUsersCount.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsersCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersCount = action.payload;
      })
      .addCase(fetchUsersCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Google OAuth URL
      .addCase(getGoogleOAuthUrl.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getGoogleOAuthUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.googleOAuthUrl = action.payload;
      })
      .addCase(getGoogleOAuthUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })
      // Login with Google
      .addCase(loginWithGoogle.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })
      // refreshSession
      .addCase(refreshSession.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.token = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload || 'Session refresh failed';
        state.isLoggedIn = false;
        state.user = null;
        state.token = null;
      });
  },
});

export const { resetAuthState, resetError } = authSlice.actions;

export default authSlice.reducer;
