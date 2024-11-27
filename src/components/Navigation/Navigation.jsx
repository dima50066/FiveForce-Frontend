import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={css.navButton}>
      <NavLink className={css.navButtonSignUp} to="/signup">
        Try tracker
      </NavLink>
      <NavLink className={css.navButtonSignIn} to="/signin">
        Sign In
      </NavLink>
    </nav>
  );
};

export default Navigation;
