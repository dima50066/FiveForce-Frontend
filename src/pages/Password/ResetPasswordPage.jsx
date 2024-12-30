import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/user/operations';
import { selectIsLoading, selectAuthError } from '../../redux/user/selectors';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Icon from '../../shared/Icons/Icon';
import css from './ResetPasswordPage.module.css';
import { useTranslation } from 'react-i18next';

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const { t, i18n } = useTranslation();
  const isUk = i18n.language === 'uk';

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('Passwords do not match!'));
      return;
    }

    try {
      await dispatch(resetPassword({ password, token })).unwrap();
      toast.success(t('Password has been reset successfully!'));
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (err) {
      toast.error(err || t('Failed to reset password. Please try again.'));
    }
  };

  return (
    <div className={`${css.container} ${isUk ? css.containerUk : ''}`}>
      <h1 className={`${css.heroTitle} ${isUk ? css.heroTitleUk : ''}`}>
        {t('Set New Password')}
      </h1>
      <form
        className={`${css.form} ${isUk ? css.formUk : ''}`}
        onSubmit={handleSubmit}
      >
        <div
          className={`${css.inputContainer} ${
            isUk ? css.inputContainerUk : ''
          }`}
        >
          <input
            className={`${css.input} ${isUk ? css.inputUk : ''}`}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t('Enter new password')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={`${css.iconButton} ${isUk ? css.iconButtonUk : ''}`}
            onClick={() => setShowPassword(prev => !prev)}
          >
            <Icon
              className={`${css.icon} ${isUk ? css.iconUk : ''}`}
              id={showPassword ? 'eye' : 'eyeOff'}
              width="20"
              height="20"
            />
          </button>
        </div>
        <div
          className={`${css.inputContainer} ${
            isUk ? css.inputContainerUk : ''
          }`}
        >
          <input
            className={`${css.input} ${isUk ? css.inputUk : ''}`}
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder={t('Confirm new password')}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={`${css.iconButton} ${isUk ? css.iconButtonUk : ''}`}
            onClick={() => setShowConfirmPassword(prev => !prev)}
          >
            <Icon
              className={`${css.icon} ${isUk ? css.iconUk : ''}`}
              id={showConfirmPassword ? 'eye' : 'eyeOff'}
              width="20"
              height="20"
            />
          </button>
        </div>
        <button
          className={`${css.button} ${isUk ? css.buttonUk : ''}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? t('Resetting...') : t('Reset Password')}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
