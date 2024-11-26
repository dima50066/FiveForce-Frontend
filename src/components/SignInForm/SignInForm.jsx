import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import css from './SignInForm.module.css';
import eye from '../../shared/Icons/eye.svg';
import eyeOff from '../../shared/Icons/eyeOff.svg';
import { login } from '../../redux/user/operations';

// Validation schema for SignIn
const signInValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const result = await dispatch(login(values)).unwrap();

      if (result) {
        toast.success('Sign-in successful!');
        // Redirect to TrackerPage or other authenticated page
      }
    } catch (error) {
      toast.error(error.customMessage || 'Login failed');
      if (error.message) {
        setFieldError('general', error.message);
      }
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
          {errors.general && <div className={css.error}>{errors.general}</div>}
          <button
            type="submit"
            className={css.button}
            disabled={isSubmitting || isLoading || !isValid}
          >
            {isSubmitting || isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;


