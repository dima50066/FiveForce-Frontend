import React from 'react';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <div className={css.homeContainer}>
        <WelcomeSection />
        <AdvantagesSection />
      </div>

      {/* <h1>Welcome to Aqua Track</h1>
      <p>Your daily hydration tracker.</p> */}
    </div>
  );
};

export default HomePage;
