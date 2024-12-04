import React, { useState } from 'react';
import css from './DailyStats.module.css';
import WaterList from '../WaterList/WaterList';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';

export default function DailyStats() {
  const [currentDate, setCurrentDate] = useState('Today');
  const [waterData, setWaterData] = useState([
    { id: 1, amount: '250 ml', time: '7:00 AM' },
    { id: 2, amount: '500 ml', time: '12:00 PM' },
    { id: 3, amount: '200 ml', time: '5:00 PM' },
  ]);

  const handleAddWater = (amount) => {
    const newEntry = {
      id: Date.now(),
      amount: `${amount} ml`,
      time: new Date().toLocaleTimeString(),
    };
    setWaterData((prevData) => [...prevData, newEntry]);
  };

  const handleDelete = (id) => {
    setWaterData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (id, newAmount, newTime) => {
    setWaterData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, amount: newAmount, time: newTime } : item
      )
    );
  };

  return (
    <div className={css.dailyStats}>
      <div className={css.header}>
        <h2 className={css.date}>{currentDate}</h2>
        <AddWaterBtn onAddWater={handleAddWater} />
      </div>
      <div className={css.waterListContainer}>
        <WaterList
          waterData={waterData}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}
