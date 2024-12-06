import { useSelector } from 'react-redux';
import { selectUserWaterNorm } from '../../redux/user/selectors.js';
import css from './WaterDailyNorma.module.css';
import { useTranslation } from "react-i18next";

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  const countWater = useSelector(selectUserWaterNorm);

  const dailyNorm = countWater > 0 ? (countWater / 1000).toFixed(1) : 1.5;

  return (
    <div className={css.waterDailyNormaWrapp}>
      <p className={css.waterDailyNorma}>{dailyNorm} {t('L')}</p>
      <p className={css.waterDailyNormaText}>{t('My daily norma')}</p>
    </div>
  );
};

export default WaterDailyNorma;
