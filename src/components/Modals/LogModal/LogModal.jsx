import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/user/operations';
import css from './LogModal.module.css';
import { toast } from 'react-hot-toast';

const LogModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logout is successfully!');
      navigate('/signin');
    } catch (error) {
      toast.error('Logout failed! Please try again.');
    }
  };

  return (
    <div className={css['log-info']}>
      <h3 className={css['log-h3']}>Log out</h3>
      <p className={css['log-question']}>Do you really want to leave?</p>
      <div className={css['btns-log-wrap']}>
        <button
          className={css['log-first-btn']}
          type="button"
          onClick={handleLogout}
        >
          Log out
        </button>
        <button
          className={css['log-second-btn']}
          type="button"
          onClick={() => onCancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogModal;
