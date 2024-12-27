import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordResetEmail } from '../../redux/user/operations';
import { selectIsLoading, selectAuthError } from '../../redux/user/selectors';
import { toast } from 'react-hot-toast'; // Імпорт Toaster
import { useNavigate } from 'react-router-dom'; // Для перенаправлення
import css from './RequestResetPage.module.css';

const RequestResetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Хук для навігації
  const [email, setEmail] = useState('');
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      toast.error('Email is required');
      return;
    }

    try {
      await dispatch(requestPasswordResetEmail({ email })).unwrap(); // Виклик екшена
      toast.success('Check your email for the password reset link!');
      setTimeout(() => {
        navigate('/'); // Перенаправлення на головну через 2 секунди
      }, 2000);
    } catch (err) {
      toast.error(err || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={css.container}>
      <h1 className={css.heroTitle}>Reset Your Password</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className={css.button} type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
    </div>
  );
};

export default RequestResetPage;
