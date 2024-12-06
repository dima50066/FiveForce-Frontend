import { useSelector } from 'react-redux';
import { selectUserWaterNorm } from '../../redux/user/selectors';
import { selectDayWater } from '../../redux/water/selectors';
import Icon from '../../shared/Icons/Icon';
import css from './WaterProgressBar.module.css';
import { useTranslation } from "react-i18next";

const WaterProgressBar = () => {
  const { t } = useTranslation();
  const dailyWaterNorm = useSelector(selectUserWaterNorm);
  const dayWater = useSelector(selectDayWater);

  const totalDrinkingWater = dayWater?.totalDayWater || 0;

  const percentage = dailyWaterNorm
    ? Math.min(Math.round((totalDrinkingWater / dailyWaterNorm) * 100), 100)
    : 0;

  return (
    <div className={css.progressBarWrapp}>
      <h4 className={css.progressBarText}>{t('Today')}</h4>
      <div className={css.progressBar}>
        <div className={css.progressline} style={{ width: `${percentage}%` }}>
          <Icon
            className={css.progressIndicator}
            id="elipce"
            width="12"
            height="12"
          />
        </div>
      </div>
      <ul className={css.progressBarList}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
