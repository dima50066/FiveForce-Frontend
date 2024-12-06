import css from './WaterDetailedInfo.module.css';
import UserPanel from '../../components/UserPanel/UserPanel';
import MonthInfo from '../PartCalendar/WaterUsageInfo';
import DailyStats from '../../components/DailyStats/DailyStats';

export default function DetailedWaterInfo() {
  return (
    <div className={css.detailedWaterInfoContainer}>
      <UserPanel />
      <DailyStats />
      <MonthInfo />
    </div>
  );
}
