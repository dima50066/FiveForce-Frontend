import React from 'react';
import css from './DayNow.module.css';

const DayNow = () => {
  const currentDate = new Date();
  const dateString = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })}`;

  return (
    <div className={css.dateContainer}>
      <span className={css.date}>{dateString}</span>
    </div>
  );
};

export default DayNow;
