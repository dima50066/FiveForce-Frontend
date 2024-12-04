import React, { useState } from 'react';
import Popover from 'react-tiny-popover';
import css from './UserBar.module.css';

export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div className={css.userBar}>
      <div className={css.profile} onClick={togglePopover}>
        <img
          src="https://via.placeholder.com/40" // замените на URL аватара
          alt="User Avatar"
          className={css.avatar}
        />
        <span className={css.userName}>Nadia</span>
        <span className={css.arrow}>{isPopoverOpen ? '▲' : '▼'}</span>
      </div>
      <Popover
        isOpen={isPopoverOpen}
        position="bottom"
        content={
          <div className={css.menu}>
            <button className={css.menuItem}>Setting</button>
            <button className={css.menuItem}>Log out</button>
          </div>
        }
        onClickOutside={() => setIsPopoverOpen(false)}
      >
        <div />
      </Popover>
    </div>
  );
}
