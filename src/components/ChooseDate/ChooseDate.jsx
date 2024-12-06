import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import css from './ChooseDate.module.css';
import { useState, useEffect } from 'react';
import { selectActiveDay } from '../../redux/water/selectors';

export default function ChooseDate() {
  const activeDayString = useSelector(selectActiveDay);
  const activeDay = new Date(activeDayString);

  const [currentDate, setCurrentDate] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (activeDay.toDateString() === new Date().toDateString()) {
      setCurrentDate(t('Today water'));
    } else {
      const monthKey = `${activeDay.toLocaleString('en-US', { month: 'long' }).toLowerCase()}`;
      const translatedMonth = t(monthKey);
      const formattedDate = `${activeDay.getDate()}, ${translatedMonth}`;
      setCurrentDate(formattedDate);
    }
  }, [activeDay, t]);

  return (
    <div>
      <h2
        className={clsx(css.currentDate, {
          [css.currentDateUk]: i18n.language === 'uk',
        })}
      >
        {currentDate}
      </h2>
    </div>
  );
}
