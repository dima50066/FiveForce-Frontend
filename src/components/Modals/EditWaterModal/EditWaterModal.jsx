import React, { useState, useEffect } from 'react';
import css from './EditWaterModal.module.css';
import Icon from '../../../shared/Icons/Icon';
import clsx from 'clsx';

const EditWaterModal = ({ currentWater, id, onSave }) => {
  const [waterAmount, setWaterAmount] = useState(currentWater?.amount || 250);
  const [time, setTime] = useState(currentWater?.time || '07:00');

  useEffect(() => {
    if (currentWater) {
      setWaterAmount(currentWater.amount);
      setTime(currentWater.time);
    }
  }, [currentWater]);

  const handleDecrease = () => {
    setWaterAmount(prev => Math.max(prev - 50, 50));
  };

  const handleIncrease = () => {
    setWaterAmount(prev => Math.min(prev + 50, 1500));
  };

  const handleTimeChange = e => {
    setTime(e.target.value);
  };

  const handleInputChange = e => {
    setWaterAmount(Number(e.target.value));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const [hours, minutes] = time.split(':').map(Number);
    const currentDate = new Date();
    const updatedTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    ).getTime();

    onSave({ id, updatedWater: { amount: waterAmount, date: updatedTime } });
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.header}>Edit the entered amount of water</h1>

        <div className={css.counterContainer}>
          <button
            className={clsx(
              css.counterBtn,
              waterAmount <= 50 && css.decrementBtn
            )}
            type="button"
            onClick={handleDecrease}
            disabled={waterAmount <= 50}
          >
            <Icon
              className={css.iconMinus}
              width="20"
              height="20"
              id="icon-minus"
            />
          </button>
          <p className={css.count}>{waterAmount} ml</p>
          <button
            className={clsx(
              css.counterBtn,
              waterAmount >= 1500 && css.incrementBtn
            )}
            type="button"
            onClick={handleIncrease}
            disabled={waterAmount >= 1500}
          >
            <Icon
              className={css.iconPlus}
              width="20"
              height="20"
              id="icon-plus"
            />
          </button>
        </div>

        <label className={css.baseLabel}>
          Recording time:
          <input
            className={css.baseInput}
            value={time}
            onChange={handleTimeChange}
            maxLength="5"
            placeholder="hh:mm"
          />
        </label>

        <label className={css.secondaryLabel}>
          Enter the value of the water used:
          <input
            className={css.baseInput}
            type="number"
            value={waterAmount}
            onChange={handleInputChange}
          />
        </label>

        <button className={css.saveBtn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditWaterModal;
