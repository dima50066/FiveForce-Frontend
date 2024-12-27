import css from './GoogleAuthBtn.module.css';
import google from '../../shared/Icons/google.svg';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

function GoogleAuthBtn() {
  const { t } = useTranslation();

  const handleClick = e => {
    e.preventDefault();
    toast.error(t('Coming soon!'), {
      duration: 3000,
      position: 'top-center',
    });
  };

  return (
    <div className={css.wrap}>
      <p className={css.text}>{t('or')}</p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.01 }}
        href="#"
        onClick={handleClick}
        className={`${css.btn} ${css.disabled}`}
      >
        <img src={google} className={css.icon} alt="Google icon" />
        <p className={css.textGoogle}>{t('Sign in with Google')}</p>
      </motion.a>
    </div>
  );
}

export default GoogleAuthBtn;
