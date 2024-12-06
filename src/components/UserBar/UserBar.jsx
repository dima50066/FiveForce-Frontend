import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Popover } from 'react-tiny-popover';
import css from './UserBar.module.css';
import { selectUserName, selectUserAvatar } from '../../redux/user/selectors';
import Modal from '../../shared/Modal/Modal.jsx';
import SettingModal from '../SettingModal/SettingModal';
import LogModal from '../Modals/LogModal/LogModal';
import { useTranslation } from 'react-i18next';
import UserBarPopover from '../UserBarPopover/UserBarPopover';

export default function UserBar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const { t } = useTranslation();

  const userName = useSelector(selectUserName) || t('Guest');
  const userAvatar = useSelector(selectUserAvatar) || '';

  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
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
    <>
      <Popover
        isOpen={isPopoverOpen}
        positions={['bottom']}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={
          <UserBarPopover
            closePopover={setIsPopoverOpen}
            openSettingModal={handleOpenSettingModal}
            openLogoutModal={handleOpenLogModal}
          />
        }
      >
        <div className={css.profile} onClick={togglePopover}>
          <span className={css.userName}>{userName}</span>
          <img src={userAvatar} className={css.avatar} />
          <span className={css.arrow}>{isPopoverOpen ? t('▲') : t('▼')}</span>
        </div>
      </Popover>

      <Modal
        isOpen={isSettingModalOpen}
        onClose={handleCloseSettingModal}
        className={`${css.modal} ${css.modalForm}`}
        classNameWrapper={css.wrapper}
      >
        <SettingModal
          isOpen={isSettingModalOpen}
          onClose={() => setIsSettingModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isLogModalOpen}
        onClose={handleCloseLogModal}
        className={css.modal}
        classNameWrapper={css.modalWrapper}
      >
        <LogModal onCancel={handleCloseLogModal} />
      </Modal>
    </>
  );
}
