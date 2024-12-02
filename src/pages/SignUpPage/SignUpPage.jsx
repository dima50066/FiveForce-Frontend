import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../shared/Logo/Logo'
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "./SignUpPage.module.css";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
const  SignUpPage = () => {
  return (
   <div className={css.cntSinin}>
   <div className={css.container}>
     <div className={css.logo}>
       <Logo />
     </div>
      <h1 className={css.heroTitle}>Sign Up</h1>
     <SignUpForm />
     <div className={css.signupLink}>
       <p>
        Already have an account?{" "}
        <Link to="/signin" className={css.link}>
          Sign In
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


export default  SignUpPage;