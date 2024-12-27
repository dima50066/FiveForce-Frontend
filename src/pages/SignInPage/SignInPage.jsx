import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';
import Logo from '../../shared/Logo/Logo';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import { useTranslation } from 'react-i18next';

const SignInPage = () => {
  const { t } = useTranslation();
  return (
    <div className={css.cntSinin}>
      <div className={css.container}>
        <div className={css.logo}>
          <Logo />
        </div>
        <h1 className={css.heroTitle}>{t('Sign In')}</h1>
        <SignInForm />
        <div className={css.forgotPassword}>
          <Link to="/request-reset" className={css.link}>
            {t('Forgot Password?')}
          </Link>
        </div>
        <div className={css.signupLink}>
          <p>
            {t("Don't have an account?")}
            <Link to="/signup" className={css.link}>
              {t('Sign Up')}
            </Link>
          </p>
        </div>
      </div>
      <div className={css.cntAdvantages}>
        <AdvantagesSection />
      </div>
    </div>
  );
};

export default SignInPage;
