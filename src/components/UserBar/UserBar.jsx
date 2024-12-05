import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Popover } from 'react-tiny-popover';
import css from './UserBar.module.css';
import { selectUserName, selectUserAvatar } from '../../redux/user/selectors';
import Modal from '../../shared/Modal/Modal.jsx';
import SettingModal from '../SettingModal/SettingModal';
import LogModal from '../Modals/LogModal/LogModal';

export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const userName = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleOpenSettingModal = () => {
    setIsSettingModalOpen(true);
    setIsPopoverOpen(false);
  };

  const handleOpenLogModal = () => {
    setIsLogModalOpen(true);
    setIsPopoverOpen(false);
  };

  const handleCloseSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  const handleCloseLogModal = () => {
    setIsLogModalOpen(false);
  };

  return (
    <div className={css.userBar}>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom']}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={
          <div className={css.menu}>
            <button className={css.menuItem} onClick={handleOpenSettingModal}>
              Setting
            </button>
            <button className={css.menuItem} onClick={handleOpenLogModal}>
              Log out
            </button>
          </div>
        }
      >
        <div className={css.profile} onClick={togglePopover}>
          <img src={userAvatar} alt="User Avatar" className={css.avatar} />
          <span className={css.userName}>{userName}</span>
          <span className={css.arrow}>{isPopoverOpen ? '▲' : '▼'}</span>
        </div>
      </Popover>

      <Modal
        isOpen={isSettingModalOpen}
        onClose={handleCloseSettingModal}
        className={`${css.modal} ${css.modalForm}` }
        classNameWrapper= {css.wrapper}
      >
        
          <SettingModal />
      </Modal>

      <Modal
        isOpen={isLogModalOpen}
        onClose={handleCloseLogModal}
        className={css.modal}
        classNameWrapper={css.modalWrapper}
      >
        <LogModal onCancel={handleCloseLogModal} />
      </Modal>
    </div>
  );
}
