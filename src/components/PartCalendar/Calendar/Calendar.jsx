import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';
import { useEffect } from 'react';
import { getDayWater } from '../../../redux/water/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDay } from '../../../redux/water/selectors';
import { setActiveDay } from '../../../redux/water/slice';

export default function Calendar({ daysData }) {
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeDay) {
      const now = new Date();
      const currentDate = now.toISOString();
      dispatch(setActiveDay(currentDate));
    }
  }, [dispatch, activeDay]);

  useEffect(() => {
    if (activeDay) {
      const timestamp = Date.parse(activeDay);
      if (!isNaN(timestamp)) {
        dispatch(getDayWater(timestamp));
      } else {
        console.error('Invalid date format in activeDay:', activeDay);
      }
    }
  }, [activeDay, dispatch]);

  const handleDayClick = day => {
    if (day) {
      const isoDate = new Date(day).toISOString();
      dispatch(setActiveDay(isoDate));
    } else {
      console.error('Invalid day value:', day);
    }
  };

  return (
    daysData?.length && (
      <ul className={css.monthlyCalendar}>
        {daysData.map((i, index) => (
          <li key={i.dateParam} onClick={() => handleDayClick(i.dateParam)}>
            <CalendarItem item={i} index={index} activeDay={activeDay} />
          </li>
        ))}
      </ul>
    )
  );
}
