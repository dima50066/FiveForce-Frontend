
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { login } from '../../redux/user/operations';
import css from './SignInForm.module.css';
import eye from '../../shared/Icons/eye.svg';
import eyeOff from '../../shared/Icons/eyeOff.svg';
import { selectIsLoading, selectAuthError } from '../../redux/user/selectors';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Використання селекторів
  const isLoading = useSelector(selectIsLoading);
  const authError = useSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const onSubmit = async data => {
    try {
      await dispatch(login(data)).unwrap();
      toast.success('Login successful!');
      navigate('/tracker'); // Перенаправлення на TrackerPage
    } catch (error) {
      toast.error(authError || 'Login failed. Please try again.');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.cntInpit}>
        <label className={css.label}>
          <span className={css.labelText}>Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            className={`${css.input} ${errors.email ? css.errorInput : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </label>
        <label className={css.label}>
          <span className={css.labelText}>Password</span>
          <div className={css.passwordField}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`${css.input} ${errors.password ? css.errorInput : ''}`}
              {...register('password')}
            />
            <button
              type="button"
              className={css.iconButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? eye : eyeOff}
                alt="Toggle password visibility"
                className={css.icon}
              />
            </button>
          </div>
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </label>
      </div>
      <button type="submit" className={css.button} disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default SignInForm;
