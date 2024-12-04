import DetailedWaterInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import css from './TrackerPage.module.css';

const TrackerPage = () => {
  return (
    <div className={css.container}>
      <div className={css.trackerPageContainer}>
        <WaterMainInfo />
        <DetailedWaterInfo />
      </div>
    </div>
  );
};

export default TrackerPage;
