import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import css from './LanguageSwitcher.module.css'; 

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    console.log(`Changing language to: ${lng}`);
    i18next.changeLanguage(lng)
      .then(() => console.log(`Language changed to: ${lng}`))
      .catch(err => console.error(`Error changing language to ${lng}:`, err));
  };

  return (
    <div className={css.buttonGroup}>
      <button className={css.button} onClick={() => changeLanguage('en')}>English</button>
      <button className={css.button} onClick={() => changeLanguage('uk')}>Українська</button>
    </div>
  );
};

export default LanguageSwitcher;
