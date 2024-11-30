import { useSelector } from 'react-redux';
import css from './WaterDailyNorma.module.css';

const WaterDailyNorma = () => {
  // const user = useSelector(selectUser);

  const dailynorma = 1.5;
  // if (user.dailyWater) {
  //   dailynorma = user.dailyWater;
  // }

  return (
    <div className={css.waterDailyNormaWrapp}>
      <p className={css.waterDailyNorma}>{dailynorma} L</p>
      <p className={css.waterDailyNormaText}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
