import React from 'react';
import { useSelector } from 'react-redux';
import css from './UserPanel.module.css';
import UserBar from '../UserBar/UserBar';
import { selectUserName } from '../../redux/user/selectors';
import { useTranslation } from "react-i18next";

export default function UserPanel() {
  const { t } = useTranslation();
  const userName = useSelector(selectUserName);

  return (
    <div className={css.userPanel}>
      <p className={css.welcome}>
        {t('Hello')}, <span className={css.userName}>{userName || t('Guest')}</span>!
      </p>
      <UserBar />
    </div>
  );
}
