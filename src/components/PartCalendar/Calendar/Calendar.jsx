import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';
import { useEffect } from 'react';
// import { fetchDayWaterData } from '../../redux/water/operations';
import { useDispatch, useSelector } from 'react-redux';
// import { selectActiveDay } from '../../redux/water/selectors';
// import { updateActiveDay } from '../../redux/water/slice';

export default function Calendar({ daysData }) {
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeDay) {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0] + 'T00:00:00.000Z';
      dispatch(updateActiveDay(currentDate));
    }
  }, [dispatch, activeDay]);

  useEffect(() => {
    if (activeDay) {
      dispatch(fetchDayWaterData(new Date(activeDay).getTime()));
    }
  }, [activeDay, dispatch]);

  const handleDayClick = day => {
    dispatch(updateActiveDay(day));
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
