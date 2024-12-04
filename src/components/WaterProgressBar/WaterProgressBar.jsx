import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Icon from '../../shared/Icons/Icon';
import css from './WaterProgressBar.module.css';

import { selectUserWaterNorm } from '../../redux/user/selectors';
import { selectDayWater, selectActiveDay } from '../../redux/water/selectors';
import { getDayWater } from '../../redux/water/operations';

const WaterProgressBar = () => {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);
  const dailyWaterNorm = useSelector(selectUserWaterNorm);
  const dayWater = useSelector(selectDayWater);

  useEffect(() => {
    if (activeDay) {
      const timestamp = Date.parse(activeDay);
      if (!isNaN(timestamp)) {
        dispatch(getDayWater(timestamp));
      } else {
        console.error('Invalid date format in activeDay:', activeDay);
      }
    }
  }, [activeDay, dispatch]);

  const totalDrinkingWater = dayWater?.totalDayWater || 0;

  const percentage = dailyWaterNorm
    ? Math.min(Math.round((totalDrinkingWater / dailyWaterNorm) * 100), 100)
    : 0;

  const [indicatorPosition, setIndicatorPosition] = useState(0);

  useEffect(() => {
    setIndicatorPosition(percentage);
  }, [percentage]);

  return (
    <div className={css.progressBarWrapp}>
      <h4 className={css.progressBarText}>Today</h4>
      <div className={css.progressBar}>
        <div
          className={css.progressline}
          style={{ width: `${indicatorPosition}%` }}
        >
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
