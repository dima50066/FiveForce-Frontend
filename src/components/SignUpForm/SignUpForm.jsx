import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from './SignUpForm.module.css';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

const SignUpForm = () => {
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      console.log('Form values:', values);
      // Replace with API call
      // Redirect to TrackerPage on success
    } catch (error) {
      console.error('SignUp error:', error);
      setFieldError('general', 'Failed to register. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', repeatPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Email
            <Field type="email" name="email"  placeholder="Enter your email" className={css.input} />
            <ErrorMessage name="email" component="span" className={css.error} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password"  placeholder="Enter your password" className={css.input} />
            <ErrorMessage name="password" component="span" className={css.error} />
          </label>
          <label className={css.label}>
            Repeat Password
            <Field type="password" name="repeatPassword"  placeholder="Repeat password" className={css.input} />
            <ErrorMessage name="repeatPassword" component="span" className={css.error} />
          </label>
          {errors.general && <div className={css.error}>{errors.general}</div>}
          <button type="submit" className={css.button} disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
