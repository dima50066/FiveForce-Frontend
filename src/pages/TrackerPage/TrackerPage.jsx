import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import css from './TrackerPage.module.css';

const TrackerPage = () => {
  return (
    <div className={css.container}>
      <div className={css.trackerPageContainer}>
        <WaterMainInfo />
      </div>
    </div>
  );
};

export default TrackerPage;
