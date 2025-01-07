import { useSelector } from 'react-redux';
import { selectUserWaterNorm } from '../../redux/user/selectors.js';
import css from './WaterDailyNorma.module.css';
import { useTranslation } from 'react-i18next';

const WaterDailyNorma = () => {
  const { t, i18n } = useTranslation();
  const isUk = i18n.language === 'uk';
  const countWater = useSelector(selectUserWaterNorm);

  const dailyNorm = countWater > 0 ? (countWater / 1000).toFixed(1) : 1.5;

  return (
    <div
      className={`${css.waterDailyNormaWrapp} ${
        isUk ? css.waterDailyNormaWrappUk : ''
      }`}
    >
      <p
        className={`${css.waterDailyNorma} ${
          isUk ? css.waterDailyNormaUk : ''
        }`}
      >
        {dailyNorm} {t('L')}
      </p>
      <p
        className={`${css.waterDailyNormaText} ${
          isUk ? css.waterDailyNormaTextUk : ''
        }`}
      >
        {t('My daily norma')}
      </p>
    </div>
  );
};

export default WaterDailyNorma;
