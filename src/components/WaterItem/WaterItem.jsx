import React from 'react';
import css from './WaterItem.module.css';

export default function WaterItem({ id, amount, time, onDelete, onEdit }) {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    const newAmount = prompt('Enter new amount (e.g., 300 ml):', amount);
    const newTime = prompt('Enter new time (e.g., 8:00 AM):', time);
    if (newAmount && newTime) {
      onEdit(id, newAmount, newTime);
    }
  };

  return (
    <li className={css.waterItem}>
      <div className={css.icon}>
        <img
          src="https://via.placeholder.com/30"
          alt="Water glass"
        />
      </div>
      <div className={css.details}>
        <strong>{amount}</strong>
        <p>{time}</p>
      </div>
      <div className={css.actions}>
        <button onClick={handleEdit} className={css.editBtn}>✏️</button>
        <button onClick={handleDelete} className={css.deleteBtn}>🗑️</button>
      </div>
    </li>
  );
}
