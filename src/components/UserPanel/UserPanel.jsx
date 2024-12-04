import React from 'react';
import css from './UserPanel.module.css';
import UserBar from '../UserBar/UserBar';

export default function UserPanel() {
  return (
    <div className={css.userPanel}>
      <p>
        Hello, <span className={css.userName}>Nadia</span>!
      </p>
      <div className={css.userBar}>
        <UserBar />
      </div>
    </div>
  );
}
