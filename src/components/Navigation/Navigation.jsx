import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav className={css.navButton}>
      <NavLink className={css.navButtonSignUp} to="/signup">
        {t('Try tracker')}
      </NavLink>
      <NavLink className={css.navButtonSignIn} to="/signin">
        {t('Sign In')}
      </NavLink>
    </nav>
  );
};

export default Navigation;
