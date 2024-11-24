import React from "react";
import { Link } from "react-router-dom";
// import Logo from "../components/Logo/Logo";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import css from "./SignUpPage.module.css";

const  SignUpPage = () => {
 return (
    <div className={css.page}>
      {/* <Logo /> */}
      <h1 className={css.title}>Sign Up</h1>
      <SignUpForm />
      <p className={css.link}>
        Already have an account?{" "}
        <Link to="/signin" className={css.linkText}>
          Sign In
        </Link>
      </p>
    </div>
  );
};


export default  SignUpPage;