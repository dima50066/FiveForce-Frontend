import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { login } from '../../redux/user/operations';
import css from './SignInForm.module.css';
import Icon from '../../shared/Icons/Icon';
import { selectIsLoading, selectAuthError } from '../../redux/user/selectors';
import GoogleAuthBtn from '../GoogleAuthBtn/GoogleAuthBtn.jsx';
import { useTranslation } from 'react-i18next';

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('Invalid email format'))
      .required(t('Email is required')),
    password: yup
      .string()
      .min(6, t('Password must be at least 6 characters'))
      .required(t('Password is required')),
  });

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
      toast.success(t('Login successful!'));
      navigate('/tracker');
    } catch (error) {
      toast.error(authError || t('Login failed. Please try again.'));
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.cntInpit}>
        <label className={css.label}>
          <span className={css.labelText}>{t('Email')}</span>
          <input
            type="email"
            placeholder={t('Enter your email')}
            className={`${css.input} ${errors.email ? css.errorInput : ''}`}
            {...register('email')}
          />
          {errors.email && (
            <span className={css.error}>{t(errors.email.message)}</span>
          )}
        </label>
        <label className={css.label}>
          <span className={css.labelText}>{t('Password')}</span>
          <div className={css.passwordField}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Enter your password')}
              className={`${css.input} ${errors.password ? css.errorInput : ''}`}
              {...register('password')}
            />
            <button
              type="button"
              className={css.iconButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon
                className={css.icon}
                id={showPassword ? 'eye' : 'eyeOff'}
                width="20"
                height="20"
              />
            </button>
          </div>
          {errors.password && (
            <span className={css.error}>{t(errors.password.message)}</span>
          )}
        </label>
      </div>
      <button type="submit" className={css.button} disabled={isLoading}>
        {isLoading ? t('Signing In...') : t('Sign In')}
      </button>
      <GoogleAuthBtn />
    </form>
  );
};

export default SignInForm;
