import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'; // Імпортуємо Routes і Route
import RestrictedRoute from './Routes/RestrictedRoute';
import PrivateRoute from './Routes/PrivateRoute';
import SharedLayout from './SharedLayout/SharedLayout';

// Заглушки для компонентів
const HomePage = () => <div>Home Page</div>;
const SignUpPage = () => <div>Sign Up Page</div>;
const SignInPage = () => <div>Sign In Page</div>;
const TrackerPage = () => <div>Tracker Page</div>;
const RefreshLoader = () => <div>Loading...</div>;
const WaterLoader = () => <div>Loading Water...</div>;

// Заглушка для isRefreshing
const isRefreshing = false;

function App() {
  return (
    <>
      <SharedLayout>
        {isRefreshing ? (
          <RefreshLoader />
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
            </Routes>
          </Suspense>
        )}
      </SharedLayout>
    </>
  );
}

export default App;
