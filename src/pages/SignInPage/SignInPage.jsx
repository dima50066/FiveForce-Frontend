
import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';

const SignInPage = () => {
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <h1>Sign In</h1>
      </div>
      <SignInForm />
      <div className={css.signupLink}>
        <p>Don't have an account?<Link to="/signup" className={css.link}>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default SignInPage;
