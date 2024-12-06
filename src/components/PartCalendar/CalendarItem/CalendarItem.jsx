import clsx from 'clsx';
import css from './CalendarItem.module.css';
import { selectUserWaterNorm } from '../../../redux/user/selectors';
import { useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";

export default function CalendarItem({ item, activeDay, index }) {
  const { t } = useTranslation();
  const dailyWaterNorm = useSelector(selectUserWaterNorm);

  const calculateWaterPercentage = totalDayWater => {
    if (!dailyWaterNorm || !totalDayWater) {
      return 0;
    }

    const waterNormInMilliliters = dailyWaterNorm;
    const percentage = (totalDayWater / waterNormInMilliliters) * 100;
    return Math.round(percentage);
  };

  const waterPercentage = calculateWaterPercentage(item?.totalDayWater);
  const isFullDay = waterPercentage >= 100;
  const isActiveDay = item.dateParam === activeDay;

  return (
    <div className={css.container}>
      <button
        className={clsx(
          css.button,
          isActiveDay && css.activeButton,
          isFullDay && css.fullDayButton
        )}
      >
        {index + 1}
      </button>
      <span className={css.label}>{waterPercentage}%</span>
    </div>
  );
}
