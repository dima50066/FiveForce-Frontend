import clsx from 'clsx';
import css from './CalendarItem.module.css';
// import { selectUserWaterNorm } from '../../redux/user/selectors';
import { useSelector } from 'react-redux';

export default function CalendarItem({ item, activeDay, index }) {
  const dailyWaterNorm = useSelector(selectUserWaterNorm);

  const calculateWaterPercentage = totalDayWater => {
    if (!dailyWaterNorm) {
      return 0;
    }
    const waterNormInMilliliters = dailyWaterNorm * 1000;
    const percentage = (totalDayWater / waterNormInMilliliters) * 100;
    let rounded = percentage.toFixed(1);
    return rounded.endsWith('.0') ? parseInt(rounded, 10) : parseFloat(rounded);
  };

  return (
    <div className={css.dayItemContainer}>
      <button
        className={clsx(
          css.dayButton,
          item.dateParam === activeDay && css.activeDayButton,
          calculateWaterPercentage(item.totalDayWater) >= 100 &&
            css.fullDayButton
        )}
      >
        {index + 1}
      </button>
      <span className={css.percentageLabel}>
        {calculateWaterPercentage(item?.totalDayWater)}%
      </span>
    </div>
  );
}
