import Logo from '../../shared/Logo/Logo.jsx';
import WaterDailyNorma from '../../components/WaterDailyNorma/WaterDailyNorma.jsx';
import WaterProgressBar from '../../components/WaterProgressBar/WaterProgressBar.jsx';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn.jsx';

import css from './WaterMainInfo.module.css';

const WaterMainInfo = () => {
  return (
    <div className={css.waterMainInfoContainer}>
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default WaterMainInfo;
