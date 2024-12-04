import css from './WaterDetailedInfo.module.css';
// import UserPanel from '../../components/UserPanel/UserPanel';
// import DailyStats from '../../components/DailyStats/DailyStats';
import MonthInfo from '../PartCalendar/MonthInfo';

export default function DetailedWaterInfo() {
  return (
    <div className={css.detailedWaterInfoContainer}>
      {/* <UserPanel />
      <DailyStats /> */}
      <MonthInfo />
    </div>
  );
}
