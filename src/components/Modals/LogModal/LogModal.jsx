import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/user/operations';
import css from './LogModal.module.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

const LogModal = ({ onCancel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logout is successfully!');
      navigate('/signin');
    } catch (error) {
      toast.error(t('Logout failed! Please try again.'));
    }
  };

  return (
    <div className={css['log-info']}>
      <h3 className={css['log-h3']}>{t('Log out')}</h3>
      <p className={css['log-question']}>{t('Do you really want to leave?')}</p>
      <div className={css['btns-log-wrap']}>
        <button
          className={css['log-first-btn']}
          type="button"
          onClick={handleLogout}
        >
          {t('Log out')}
        </button>
        <button
          className={css['log-second-btn']}
          type="button"
          onClick={() => onCancel()}
        >
          {t('Cancel')}
        </button>
      </div>
    </div>
  );
};

export default LogModal;
