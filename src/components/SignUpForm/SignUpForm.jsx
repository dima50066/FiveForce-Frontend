import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';
import { register } from '../../redux/user/operations';
import { selectIsLoading, selectAuthError } from '../../redux/user/selectors';
import css from './SignUpForm.module.css';
import Icon from '../../shared/Icons/Icon';
import GoogleAuthBtn from '../GoogleAuthBtn/GoogleAuthBtn.jsx';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const isLoading = useSelector(selectIsLoading);
  const authError = useSelector(selectAuthError);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('Invalid email format'))
      .required(t('Email is required')),
    password: yup
      .string()
      .min(6, t('Password must be at least 6 characters'))
      .required(t('Password is required')),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('Passwords must match'))
      .required(t('Repeat Password is required')),
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const onSubmit = async data => {
    try {
      const { repeatPassword, ...payload } = data;
      await dispatch(register(payload)).unwrap();
      toast.success(t('Registration successful!'));
      navigate('/tracker');
    } catch (error) {
      toast.error(authError || t('Registration failed. Please try again.'));
    }
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
    >
      <div className={css.cntInpit}>
        <label className={css.label}>
          <span className={css.labelText}>{t('Email')}</span>
          <input
            type="email"
            placeholder={t('Enter your email')}
            className={`${css.input} ${errors.email ? css.errorInput : ''}`}
            {...formRegister('email')}
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
              {...formRegister('password')}
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
        <label className={css.label}>
          <span className={css.labelText}>{t('Repeat Password')}</span>
          <div className={css.passwordField}>
            <input
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder={t('Repeat your password')}
              className={`${css.input} ${errors.repeatPassword ? css.errorInput : ''}`}
              {...formRegister('repeatPassword')}
            />
            <button
              type="button"
              className={css.iconButton}
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              <Icon
                className={css.icon}
                id={showRepeatPassword ? 'eye' : 'eyeOff'}
                width="20"
                height="20"
              />
            </button>
          </div>
          {errors.repeatPassword && (
            <span className={css.error}>
              {t(errors.repeatPassword.message)}
            </span>
          )}
        </label>
      </div>
      <button type="submit" className={css.button} disabled={isLoading}>
        {isLoading ? t('Signing Up...') : t('Sign Up')}
      </button>
      <GoogleAuthBtn />
    </form>
  );
};

export default SignUpForm;
