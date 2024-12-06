import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from './MonthInfo';
import css from './MonthInfo.module.css';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthWater } from '../../redux/water/selectors.js';
import { getMonthWater } from '../../redux/water/operations.js';
import { useTranslation } from 'react-i18next';
import { selectIsRefreshing, selectUser } from '../../redux/user/selectors';

export default function MonthInfo() {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const daysList = useSelector(selectMonthWater);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const timestamp = new Date(date).getTime();
    if (
      !isRefreshing &&
      user &&
      !daysList.some(day => day.timestamp === timestamp)
    ) {
      dispatch(getMonthWater(timestamp));
    }
  }, [dispatch, date, daysList, isRefreshing, user]);

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
    t('January'),
    t('February'),
    t('March'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ];

  return (
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2 className={clsx(css.title)}>{t('Month water')}</h2>
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
