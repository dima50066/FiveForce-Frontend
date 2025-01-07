import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css';
import Icon from '../../shared/Icons/Icon';

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const changeLanguage = lng => {
    i18next
      .changeLanguage(lng)
      .then(() => {
        localStorage.setItem('language', lng);
      })
      .catch(err => console.error(`Error changing language to ${lng}:`, err));
  };

  return (
    <div className={css.switcher}>
      <button
        className={css.button}
        onClick={() => changeLanguage('en')}
        title={t('English')}
      >
        <Icon id="icon-england" className={css.icon} width="24" height="24" />
      </button>
      <button
        className={css.button}
        onClick={() => changeLanguage('uk')}
        title={t('Ukrainian')}
      >
        <Icon id="icon-ukraine" className={css.icon} width="24" height="24" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;
