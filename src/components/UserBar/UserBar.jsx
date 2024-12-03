import React, { useState } from 'react';
import css from './UserBar.module.css';
import { Popover } from 'react-tiny-popover';

const UserBar = ({ userName, userAvatar }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['bottom']}
      onClickOutside={() => setPopoverOpen(false)}
      content={
        <div className={css.popoverContent}>
          <button className={css.settingButton}>Setting</button>
          <button className={css.logoutButton}>Log out</button>
        </div>
      }
    >
      <div
        className={css.userBar}
        onClick={() => setPopoverOpen(!isPopoverOpen)}
      >
        <img src={userAvatar} alt={`${userName}'s avatar`} className={css.avatar} />
        <span className={css.userName}>{userName}</span>
        <span className={css.arrow}>▼</span>
      </div>
    </Popover>
  );
};

export default UserBar;
