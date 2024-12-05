import css from './GoogleAuthBtn.module.css';
import google from '../../shared/Icons/google.svg';
import { motion } from "framer-motion";

function GoogleAuthBtn() {
    return (
<div className = { css.wrap }> 
 <p children={css.text}>or</p>
 <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.01 }}
        href="https://five-force-aqua-track.vercel.app/users/get-oauth-url"
        className={css.btn}
      >
        <img src={google} className={css.icon}/>
        <p className={css.textGoogle}>Sign in with Google</p>
      </motion.a>
</div>
)
};

export default GoogleAuthBtn;