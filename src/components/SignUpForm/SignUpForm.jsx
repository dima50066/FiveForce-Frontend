import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from './SignUpForm.module.css';
import eye from '../../shared/Icons/eye.svg';
import eyeOff from '../../shared/Icons/eyeOff.svg';
import { toast } from 'react-toastify'; // імпортуємо бібліотеку для спливаючих повідомлень

// validation schema for SignUp
const signUpValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

// SignUpForm component
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(prevState => !prevState);
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      console.log('Form values:', values);
      // Замініть на API запит для реєстрації
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        // Якщо реєстрація успішна, збережіть токен і перенаправте
        localStorage.setItem('token', data.token);
        toast.success('Registration successful!'); // спливаюче повідомлення
        // Перенаправлення на TrackerPage (можна використати react-router-dom)
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('SignUp error:', error);
      toast.error('Failed to register. Please try again.'); // спливаюче повідомлення
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', repeatPassword: '' }}
      validationSchema={signUpValidationSchema}
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
            <label className={css.label}>
              <span className={css.labelText}>Repeat Password</span>
              <div className={css.passwordField}>
                <Field
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="repeatPassword"
                  placeholder="Repeat your password"
                  className={`${css.input} ${errors.repeatPassword && touched.repeatPassword ? css.errorInput : ''}`}
                  onBlur={() => setFieldTouched('repeatPassword', true)}
                />
                <button
                  type="button"
                  className={css.iconButton}
                  onClick={toggleRepeatPasswordVisibility}
                  aria-label={showRepeatPassword ? 'Hide repeat password' : 'Show repeat password'}
                >
                  <img
                    src={showRepeatPassword ? eye : eyeOff}
                    alt={showRepeatPassword ? 'Hide repeat password' : 'Show repeat password'}
                    className={css.icon}
                  />
                </button>
              </div>
              <ErrorMessage name="repeatPassword" component="span" className={css.error} />
            </label>
          </div>
          {errors.general && <div className={css.error}>{errors.general}</div>}
          <button
            type="submit"
            className={css.button}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
