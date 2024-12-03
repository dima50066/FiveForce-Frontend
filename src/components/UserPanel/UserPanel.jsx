import React from 'react';
import css from './UserPanel.module.css';
import UserBar from '../UserBar/UserBar';

const UserPanel = ({ userName, userAvatar }) => {
  return (
    <div className={css.userPanel}>
      <p className={css.greeting}>
        Hello, <span className={css.userName}>{userName}</span>!
      </p>
      <UserBar userName={userName} userAvatar={userAvatar} />
    </div>
  );
};

export default UserPanel;
