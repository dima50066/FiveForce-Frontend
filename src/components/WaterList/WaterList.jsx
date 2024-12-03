import React from 'react';
import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';

const WaterList = ({ waterData }) => {
  return (
    <ul className={css.waterList}>
      {waterData.length > 0 ? (
        waterData.map((item) => (
          <WaterItem
            key={item.id}
            volume={item.volume}
            time={item.time}
          />
        ))
      ) : (
        <div className={css.noData}>
          <span className={css.icon}>💧</span>
          <p>Not found</p>
        </div>
      )}
    </ul>
  );
};

export default WaterList;
