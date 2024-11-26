import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/user/operations';
import css from './SignUpForm.module.css';
import eye from '../../shared/Icons/eye.svg';
import eyeOff from '../../shared/Icons/eyeOff.svg';
import { toast } from 'react-toastify';

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(error.customMessage || 'Failed to register. Please try again.');
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
                <button type="button" className={css.iconButton} onClick={togglePasswordVisibility}>
                  <img src={showPassword ? eye : eyeOff} alt="Toggle password visibility" className={css.icon} />
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
                <button type="button" className={css.iconButton} onClick={toggleRepeatPasswordVisibility}>
                  <img src={showRepeatPassword ? eye : eyeOff} alt="Toggle repeat password visibility" className={css.icon} />
                </button>
              </div>
              <ErrorMessage name="repeatPassword" component="span" className={css.error} />
            </label>
          </div>
          <button type="submit" className={css.button} disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
