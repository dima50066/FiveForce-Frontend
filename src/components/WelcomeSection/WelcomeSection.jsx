import Logo from '../../shared/Logo/Logo.jsx';
import Navigation from '../Navigation/Navigation.jsx';
import css from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <section className={css.welcomeSectionWrapp}>
      <Logo />

      <h3 className={css.welcomeText}>Record daily water intake and track</h3>
      <h1 className={css.welcomeTitle}>Water consumption tracker</h1>

      <Navigation />
    </section>
  );
};

export default WelcomeSection;
