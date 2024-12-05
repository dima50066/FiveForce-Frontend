import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RestrictedRoute from './Routes/RestrictedRoute';
import PrivateRoute from './Routes/PrivateRoute';
import SharedLayout from '../components/SharedLayout/SharedLayout';
import HomePage from '../pages/HomePage/HomePage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import TrackerPage from '../pages/TrackerPage/TrackerPage';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../redux/user/operations';
import { selectIsRefreshing } from '../redux/user/selectors';
import SettingModal from './SettingModal/SettingModal';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import WaterLoader from '../shared/Loaders/WaterLoader';
import { getDayWater } from '../redux/water/operations';
import { setActiveDay } from '../redux/water/slice';
import { selectActiveDay } from '../redux/water/selectors';

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
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
    if (!activeDay) {
      const now = new Date();
      const currentDate = now.toISOString();
      dispatch(setActiveDay(currentDate));
    }
  }, [dispatch, activeDay]);

  useEffect(() => {
    if (activeDay) {
      const timestamp = Date.parse(activeDay);
      if (!isNaN(timestamp)) {
        dispatch(getDayWater(timestamp));
      }
    }
  }, [activeDay, dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
            </Routes>
          </Suspense>
        )}
      </SharedLayout>
    </>
  );
};

export default App;
