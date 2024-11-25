import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from './SignInForm.module.css';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignInForm = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      console.log('Form values:', values);
      // Replace with API call for login
      // Redirect to TrackerPage on success
    } catch (error) {
      console.error('SignIn error:', error);
      setFieldError('general', 'Failed to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
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
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </label>
            <label className={css.label}>
              <span className={css.labelText}>Password</span>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`${css.input} ${errors.password && touched.password ? css.errorInput : ''}`}
                onBlur={() => setFieldTouched('password', true)} 
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </label>
          </div>
          {errors.general && <div className={css.error}>{errors.general}</div>}
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
