export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsLoading = state => state.auth.isLoading;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectUserToken = state => state.auth.token;
export const selectRefreshToken = state => state.auth.refreshToken;

export const selectAuthError = state => state.auth.error;

export default {
  selectUser,
  selectIsLoggedIn,
  selectIsLoading,
  selectIsRefreshing,
  selectUserToken,
  selectRefreshToken,
  selectAuthError,
};
