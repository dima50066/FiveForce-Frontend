import { Suspense, useEffect } from 'react';
import i18next from 'i18next';
import { Routes, Route } from 'react-router-dom';
import RestrictedRoute from './Routes/RestrictedRoute';
import PrivateRoute from './Routes/PrivateRoute';
import SharedLayout from '../components/SharedLayout/SharedLayout';
import HomePage from '../pages/HomePage/HomePage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import TrackerPage from '../pages/TrackerPage/TrackerPage';
import PasswordResetPage from '../pages/Password/ResetPasswordPage';
import PasswordRequestPage from '../pages/Password/RequestResetPage';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing, selectUser } from '../redux/user/selectors';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import WaterLoader from '../shared/Loaders/WaterLoader';
import { getDayWater } from '../redux/water/operations';
import { setActiveDay } from '../redux/water/slice';
import { selectActiveDay } from '../redux/water/selectors';
import { refreshSession } from '../redux/user/operations';
import { setAuthHeader } from '../utils/axiosConfig';

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const activeDay = useSelector(selectActiveDay);

  useEffect(() => {
    const removeLoader = () => {
      const loader = document.getElementById('loader-wrapper');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }
    };

    removeLoader();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthHeader(token);
      dispatch(refreshSession());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!activeDay && user && !isRefreshing) {
      const now = new Date();
      const currentDate = now.toISOString();
      dispatch(setActiveDay(currentDate));
    }
  }, [dispatch, activeDay, user, isRefreshing]);

  useEffect(() => {
    if (activeDay && user && !isRefreshing) {
      const timestamp = Date.parse(activeDay);
      if (!isNaN(timestamp)) {
        dispatch(getDayWater(timestamp));
      }
    }
  }, [activeDay, dispatch, user, isRefreshing]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18next.changeLanguage(savedLanguage);
    }
  }, []);

  const updateBodyClass = language => {
    const body = document.body;

    body.classList.remove('lang-en', 'lang-uk');

    body.classList.add(`lang-${language}`);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18next.changeLanguage(savedLanguage);
    updateBodyClass(savedLanguage);

    i18next.on('languageChanged', lng => {
      updateBodyClass(lng);
    });
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />
      <SharedLayout>
        {isRefreshing ? (
          <div className="text-center p-4">
            <WaterLoader />
          </div>
        ) : (
          <Suspense fallback={<WaterLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <RestrictedRoute
                    component={<HomePage />}
                    redirectTo="/tracker"
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <RestrictedRoute
                    component={<SignUpPage />}
                    redirectTo="/tracker"
                  />
                }
              />
              <Route
                path="/signin"
                element={
                  <RestrictedRoute
                    component={<SignInPage />}
                    redirectTo="/tracker"
                  />
                }
              />
              <Route
                path="/tracker"
                element={
                  <PrivateRoute component={<TrackerPage />} redirectTo="/" />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/request-reset" element={<PasswordRequestPage />} />
              <Route path="/reset-password" element={<PasswordResetPage />} />
            </Routes>
          </Suspense>
        )}
      </SharedLayout>
    </>
  );
};

export default App;
