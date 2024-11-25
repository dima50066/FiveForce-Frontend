import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from './SignInForm.module.css';
import eye from '../../shared/Icons/eye.svg';
import eyeOff from '../../shared/Icons/eyeOff.svg';
import { toast } from 'react-toastify';

// Validation schema for SignIn
const signInValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// SignInForm component
const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form values:', values);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Sign-in successful!');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('SignIn error:', error);
      toast.error('Failed to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched, setFieldTouched, isValid }) => (
        <Form className={css.form}>
          <div className={css.cntInpit}>
            <label className={css.label}>
              <span className={css.labelText}>Email</span>
              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className={`${css.input} ${errors.email && touched.email ? css.errorInput : ''}`}
                onBlur={() => setFieldTouched('email', true)}
              />
              <ErrorMessage name="email" component="span" className={css.error} />
            </label>
            <label className={css.label}>
              <span className={css.labelText}>Password</span>
              <div className={css.passwordField}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  className={`${css.input} ${errors.password && touched.password ? css.errorInput : ''}`}
                  onBlur={() => setFieldTouched('password', true)}
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <img
                    src={showPassword ? eye : eyeOff}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    className={css.icon}
                  />
                </button>
              </div>
              <ErrorMessage name="password" component="span" className={css.error} />
            </label>
          </div>
          <button
            type="submit"
            className={css.button}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;

