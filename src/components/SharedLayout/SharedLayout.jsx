// src/components/SharedLayout/SharedLayout.jsx
import clsx from 'clsx';
import css from './SharedLayout.module.css';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

export default function SharedLayout({ children }) {
  return (
    <div className={clsx(css.container)}>
      <header>
        <LanguageSwitcher /> {/* Добавляем компонент LanguageSwitcher в хедер */}
      </header>
      {children}
    </div>
  );
}
