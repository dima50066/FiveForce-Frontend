import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/user/operations';
import { selectIsLoading, selectAuthError } from '../../redux/user/selectors';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Icon from '../../shared/Icons/Icon';
import css from './ResetPasswordPage.module.css';

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

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      await dispatch(resetPassword({ password, token })).unwrap();
      toast.success('Password has been reset successfully!');
      setTimeout(() => {
        navigate('/signin'); // Перенаправлення на сторінку входу
      }, 2000);
    } catch (err) {
      toast.error(err || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.heroTitle}>Set New Password</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputContainer}>
          <input
            className={css.input}
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter new password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={css.iconButton}
            onClick={() => setShowPassword(prev => !prev)}
          >
            <Icon
              className={css.icon}
              id={showPassword ? 'eye' : 'eyeOff'}
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className={css.inputContainer}>
          <input
            className={css.input}
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={css.iconButton}
            onClick={() => setShowConfirmPassword(prev => !prev)}
          >
            <Icon
              className={css.icon}
              id={showConfirmPassword ? 'eye' : 'eyeOff'}
              width="20"
              height="20"
            />
          </button>
        </div>
        <button className={css.button} type="submit" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
