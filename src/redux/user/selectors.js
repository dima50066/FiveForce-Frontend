export const selectUser = state => state.auth.user;
export const selectUserToken = state => state.auth.token;

export const selectIsLoggedIn = state => !!state.auth.token;
export const selectIsLoading = state => state.auth.isLoading;
export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectAuthError = state => state.auth.error;

export const selectUsersCount = state => state.auth.usersCount;

export const selectGoogleOAuthUrl = state => state.auth.googleOAuthUrl;

// Users
export const selectUserWaterNorm = state => state.auth.user.dailyNorm;
export const selectUserName = state => state.auth.user?.name || null;
export const selectUserEmail = state => state.auth.user?.email || null;
export const selectUserAvatar = state => state.auth.user?.avatar || null;

export default {
  selectUser,
  selectUserToken,
  selectIsLoggedIn,
  selectIsLoading,
  selectIsRefreshing,
  selectAuthError,
  selectUserName,
  selectUserEmail,
  selectUserAvatar,
  selectUsersCount,
  selectGoogleOAuthUrl,
};
