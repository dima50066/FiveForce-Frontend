import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../shared/Logo/Logo'
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "./SignUpPage.module.css";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const { t } = useTranslation();
  return (
   <div className={css.cntSinin}>
     <div className={css.container}>
       <div className={css.logo}>
         <Logo />
       </div>
       <h1 className={css.heroTitle}>{t('Sign Up')}</h1>
       <SignUpForm />
       <div className={css.signupLink}>
         <p>
           {t('Already have an account?')}{" "}
           <Link to="/signin" className={css.link}>
             {t('Sign In')}
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

export default SignUpPage;
