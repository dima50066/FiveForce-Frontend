import React from 'react';
import css from './UserBarPopover.module.css';
import Icon from '../../shared/Icons/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function UserBarPopover({
  closePopover,
  openSettingModal,
  openLogoutModal,
}) {
  const { t } = useTranslation();

  const onLogoutClick = () => {
    openLogoutModal(true);
    closePopover(false);
  };

  const onSettingClick = () => {
    openSettingModal(true);
    closePopover(false);
  };

  return (
    <div className={css.wrap}>
      <button
        className={clsx(css.settingBtn)}
        type="button"
        onClick={onSettingClick}
      >
        <Icon
          id="settings"
          width="15"
          height="15"
          className={css.settingIcon}
        />
        {t('Settings')}
      </button>
      <button
        className={clsx(css.logoutBtn)}
        type="button"
        onClick={onLogoutClick}
      >
        <Icon id="logOut" width="15" height="15" className={css.logoutIcon} />
        {t('Log out')}
      </button>
    </div>
  );
}
