import React from 'react';
import css from './DayInfo.module.css';
import WaterList from '../WaterList/WaterList';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import DayNow from '../DayNow/DayNow';

const DayInfo = ({ date, waterData }) => {
  return (
    <div className={css.dayInfo}>
      <div className={css.header}>
        <DayNow />
        <AddWaterBtn />
      </div>
      <WaterList waterData={waterData} />
    </div>
  );
};

export default DayInfo;
