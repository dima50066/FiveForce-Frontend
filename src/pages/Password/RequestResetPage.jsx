import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordResetEmail } from '../../redux/user/operations';
import { selectIsLoading, selectAuthError } from '../../redux/user/selectors';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import css from './RequestResetPage.module.css';
import { useTranslation } from 'react-i18next';

const RequestResetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const { t, i18n } = useTranslation();
  const isUk = i18n.language === 'uk';

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      toast.error(t('Email is required'));
      return;
    }

    try {
      await dispatch(requestPasswordResetEmail({ email })).unwrap();
      toast.success(t('Check your email for the password reset link!'));
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      toast.error(err || t('Something went wrong. Please try again.'));
    }
  };

  return (
    <div className={`${css.container} ${isUk ? css.containerUk : ''}`}>
      <h1 className={`${css.heroTitle} ${isUk ? css.heroTitleUk : ''}`}>
        {t('Reset Your Password')}
      </h1>
      <form
        className={`${css.form} ${isUk ? css.formUk : ''}`}
        onSubmit={handleSubmit}
      >
        <input
          className={`${css.input} ${isUk ? css.inputUk : ''}`}
          type="email"
          name="email"
          placeholder={t('Enter your email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button
          className={`${css.button} ${isUk ? css.buttonUk : ''}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? t('Sending...') : t('Send Reset Email')}
        </button>
      </form>
    </div>
  );
};

export default RequestResetPage;
