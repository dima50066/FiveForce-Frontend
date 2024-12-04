import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Icon from '../../shared/Icons/Icon';
import css from './WaterProgressBar.module.css';

import { selectUserWaterNorm } from '../../redux/user/selectors';
import { selectDayWater } from '../../redux/water/selectors.js';

const WaterProgressBar = () => {
  // Денна норма води (мл)
  const dailyWaterNorm = useSelector(selectUserWaterNorm);

  // Дані про випиту воду за день
  const dayWater = useSelector(selectDayWater);

  // Перевірка наявності даних
  const waterData = dayWater?.water || [];

  // Обчислення загального обсягу випитої води (мл)
  const totalDrinkingWater = waterData.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  // Розрахунок відсотка
  const percentage = dailyWaterNorm
    ? Math.min(Math.round((totalDrinkingWater / dailyWaterNorm) * 100), 100)
    : 0;

  // Хуки для плавного руху progressIndicator
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
