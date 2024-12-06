import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMonthWater } from '../../redux/water/selectors.js';
import { getMonthWater } from '../../redux/water/operations.js';
import Calendar from './Calendar/Calendar';
import CalendarPagination from './CalendarPagination/CalendarPagination';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import css from './WaterUsageInfo.module.css';
import Statistics from '../Statistics/Statistics';

export default function WaterUsageInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showStatistics, setShowStatistics] = useState(false);
  const dailyWaterData = useSelector(selectMonthWater);
  const dispatch = useDispatch();

  useEffect(() => {
    const timestamp = new Date(selectedDate).getTime();
    dispatch(getMonthWater(timestamp));
  }, [dispatch, selectedDate]);

  useEffect(() => {}, [dailyWaterData]);
  const { t } = useTranslation();

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
    <div className={css.waterUsageInfoContainer}>
      <div className={css.paginationControlsContainer}>
        <h2 className={clsx(css.title)}>{t('Month')}</h2>
        <CalendarPagination
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
          currentDate={selectedDate}
          isStatistics={showStatistics}
          toggleStatistics={() => setShowStatistics(prev => !prev)}
        />
      </div>
      {showStatistics ? <Statistics /> : <Calendar daysData={dailyWaterData} />}
    </div>
  );
}
