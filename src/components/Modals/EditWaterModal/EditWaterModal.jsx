import React, { useState, useEffect } from 'react';
import styles from './EditWaterModal.module.css';
import Icon from '../../../shared/Icons/Icon';
import clsx from 'clsx';

const EditWaterModal = ({ waterId, currentWater, onSave, onCancel }) => {
  const [waterAmount, setWaterAmount] = useState(currentWater?.amount || 250);
  const [time, setTime] = useState(
    currentWater
      ? new Date(currentWater.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '07:00'
  );

  useEffect(() => {
    if (currentWater) {
      setWaterAmount(currentWater.amount);
      setTime(
        new Date(currentWater.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
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
    const value = Number(e.target.value);
    if (value >= 50 && value <= 1500) {
      setWaterAmount(value);
    }
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

    onSave({
      id: waterId,
      updatedWater: { amount: waterAmount, date: updatedTime },
    });
  };

  return (
    <div className={styles['container']}>
      <form className={styles['form']} onSubmit={handleSubmit}>
        <h1 className={styles['header']}>Edit the entered amount of water</h1>

        <div className={styles['counterContainer']}>
          <button
            className={clsx(
              styles['counterBtn'],
              waterAmount <= 50 && styles['decrementBtn']
            )}
            type="button"
            onClick={handleDecrease}
            disabled={waterAmount <= 50}
          >
            <Icon
              className={styles['iconMinus']}
              width="20"
              height="20"
              id="icon-minus"
            />
          </button>
          <p className={styles['count']}>{waterAmount} ml</p>
          <button
            className={clsx(
              styles['counterBtn'],
              waterAmount >= 1500 && styles['incrementBtn']
            )}
            type="button"
            onClick={handleIncrease}
            disabled={waterAmount >= 1500}
          >
            <Icon
              className={styles['iconPlus']}
              width="20"
              height="20"
              id="icon-plus"
            />
          </button>
        </div>

        <label className={styles['baseLabel']}>
          Recording time:
          <input
            className={styles['baseInput']}
            value={time}
            onChange={handleTimeChange}
            maxLength="5"
            placeholder="hh:mm"
          />
        </label>

        <label className={styles['secondaryLabel']}>
          Enter the value of the water used:
          <input
            className={styles['baseInput']}
            type="number"
            value={waterAmount}
            onChange={handleInputChange}
            min="50"
            max="1500"
          />
        </label>

        <div className={styles['buttonContainer']}>
          <button className={styles['saveBtn']} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWaterModal;
