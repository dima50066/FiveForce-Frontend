import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthWater } from '../../redux/water/selectors.js';
import { getMonthWater } from '../../redux/water/operations.js';
import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import clsx from 'clsx';
import css from './MonthInfo.module.css';

export default function WaterUsageInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dailyWaterData = useSelector(selectMonthWater);
  const dispatch = useDispatch();

  useEffect(() => {
    const timestamp = new Date(selectedDate).getTime();
    dispatch(getMonthWater(timestamp));
  }, [dispatch, selectedDate]);

  useEffect(() => {}, [dailyWaterData]);

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
        <h2 className={clsx(css.title)}>Month</h2>
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
