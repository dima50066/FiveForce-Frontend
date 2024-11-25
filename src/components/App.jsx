import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SharedLayout from '../components/SharedLayout/SharedLayout';
import HomePage from '../pages/HomePage/HomePage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import TrackerPage from '../pages/TrackerPage/TrackerPage';
import SettingModal from '../pages/SettingModal/SettingModal';


const App = () => {
  return (
    <Router>
      <SharedLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/setting" element={<SettingModal />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </Router>
  );
};

export default App;
