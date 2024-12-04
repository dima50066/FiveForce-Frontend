import CalendarPagination from './CalendarPagination/CalendarPagination';
import Calendar from './Calendar/Calendar';
import css from './MonthInfo.module.css';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
// import { selectMonthlyWaterData } from '../../redux/water/selectors.js';
// import { fetchMonthlyWaterUsage } from '../../redux/water/operations.js';

export default function WaterUsageInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dailyWaterData = useSelector(selectMonthlyWaterData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyWaterUsage(new Date(selectedDate).getTime()));
  }, [dispatch, selectedDate]);

  const handlePreviousMonth = () => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className={css.waterUsageInfoContainer}>
      <div className={css.paginationControlsContainer}>
        <h2 className={clsx(css.title)}>Monthly Water Usage</h2>
        <CalendarPagination
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
          monthNames={monthNames}
          currentDate={selectedDate}
        />
      </div>
      <Calendar daysData={dailyWaterData} />
    </div>
  );
}
