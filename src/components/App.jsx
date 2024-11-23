import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SharedLayout from '../components/SharedLayout/SharedLayout';
import HomePage from '../pages/HomePage/HomePage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import TrackerPage from '../pages/TrackerPage/TrackerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {/* Головна сторінка */}
          <Route index element={<HomePage />} />
          {/* Сторінка входу */}
          <Route path="/signin" element={<SignInPage />} />
          {/* Сторінка реєстрації */}
          <Route path="/signup" element={<SignUpPage />} />
          {/* Сторінка трекера */}
          <Route path="/tracker" element={<TrackerPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
