import css from './GoogleAuthBtn.module.css';
import google from '../../shared/Icons/google.svg';
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function GoogleAuthBtn() {
  const { t } = useTranslation();
    return (
<div className={css.wrap}> 
 <p className={css.text}>{t('or')}</p>
 <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.01 }}
        href="https://five-force-fronted.vercel.app/users/get-oauth-url"
        className={css.btn}
      >
        <img src={google} className={css.icon} />
        <p className={css.textGoogle}>{t("Sign in with Google")}</p>
      </motion.a>
</div>
)
};

export default GoogleAuthBtn;
