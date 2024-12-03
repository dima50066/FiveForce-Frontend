import React from 'react';
import css from './WaterItem.module.css';

const WaterItem = ({ volume, time }) => {
  return (
    <li className={css.waterItem}>
      <div className={css.icon}>💧</div>
      <div className={css.info}>
        <strong>{volume} ml</strong>
        <p>{time}</p>
      </div>
      <div className={css.actions}>
        <button className={css.editBtn}>✏️</button>
        <button className={css.deleteBtn}>🗑️</button>
      </div>
    </li>
  );
};

export default WaterItem;
