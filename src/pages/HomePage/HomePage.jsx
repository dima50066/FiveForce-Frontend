import SignInPage from '../SignInPage/SignInPage';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Aqua Track</h1>
      <p>Your daily hydration tracker.</p>
      <SignInPage/>
    </div>
  );
};

export default HomePage;
