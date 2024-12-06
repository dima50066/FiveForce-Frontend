import React from 'react';
import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';

export default function WaterList({ waterData, onDelete, onEdit }) {
  return (
    <ul className={css.waterList}>
      {waterData && waterData.length > 0 ? (
        waterData.map(item => (
          <WaterItem
            key={item._id}
            id={item._id}
            amount={item.amount}
            time={new Date(item.date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      ) : (
        <div className={css.noData}>
          <p>No records found</p>
        </div>
      )}
    </ul>
  );
}
