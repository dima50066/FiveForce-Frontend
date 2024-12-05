import css from './Calendar.module.css';
import CalendarItem from '../CalendarItem/CalendarItem';
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveDay } from '../../../redux/water/selectors';
import { setActiveDay } from '../../../redux/water/slice';

export default function Calendar({ daysData }) {
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();

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
