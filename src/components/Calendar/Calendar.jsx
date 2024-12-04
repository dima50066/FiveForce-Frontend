import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import css from './MonthInfo.module.css';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthWater } from '../../redux/water/selectors.js';
import { getMonthInfo } from '../../redux/water/operations.js';

export default function MonthInfo() {
  const [date, setDate] = useState(new Date());
  const daysList = useSelector(selectMonthWater);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonthInfo(new Date(date).getTime()));
  }, [dispatch, date]);

  const handlePrevMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setDate(prevDate => {
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
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2 className={clsx(css.title)}>Month water</h2>
        <CalendarPagination
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          monthNames={monthNames}
          date={date}
        />
      </div>
      <Calendar daysList={daysList} />
    </div>
  );
}
