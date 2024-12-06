import Logo from '../../shared/Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import css from './WelcomeSection.module.css';
import { useTranslation } from "react-i18next";

const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <section className={css.welcomeSectionWrapp}>
      <Logo />

      <h3 className={css.welcomeText}>{t('Record daily water intake and track')}</h3>
      <h1 className={css.welcomeTitle}>{t('Water consumption tracker')}</h1>

      <Navigation />
    </section>
  );
};

export default WelcomeSection;
