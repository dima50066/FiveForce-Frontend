import { useSelector } from 'react-redux';
import { selectUserWaterNorm } from '../../redux/user/selectors.js';
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  const countWater = useSelector(selectUserWaterNorm);

  const dailyNorm = countWater > 0 ? (countWater / 1000).toFixed(1) : 1.5;

  return (
    <div className={css.waterDailyNormaWrapp}>
      <p className={css.waterDailyNorma}>{dailyNorm} L</p>
      <p className={css.waterDailyNormaText}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
