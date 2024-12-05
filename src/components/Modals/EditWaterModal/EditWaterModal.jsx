import React, { useState, useEffect } from 'react';
import css from './EditWaterModal.module.css';
import Icon from '../../../shared/Icons/Icon';
import clsx from 'clsx';

const EditWaterModal = ({ currentWater, id, onSave }) => {
  const [waterAmount, setWaterAmount] = useState(currentWater?.amount || 250);
  const [time, setTime] = useState(currentWater?.time || '07:00');
  const [error, setError] = useState('');
  const [timeError, setTimeError] = useState(false);

  useEffect(() => {
    if (currentWater) {
      setWaterAmount(currentWater.amount);
      setTime(currentWater.time);
    }
  }, [currentWater]);

  const handleDecrease = () => {
    const newAmount = Math.max(waterAmount - 50, 50);
    setWaterAmount(newAmount);
    setError('');
  };

  const handleIncrease = () => {
    const newAmount = Math.min(waterAmount + 50, 1500);
    setWaterAmount(newAmount);
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      setTimeError(true);
      return;
    }

    if (waterAmount < 50 || waterAmount > 1500) {
      setError('Value must be between 50 and 1500');
      return;
    }

    setError('');
    setTimeError(false);

    onSave({ id, updatedWater: { amount: waterAmount, time } });
  };

  const handleInputChange = e => {
    const value = Number(e.target.value);

    if (!value || value < 0) {
      setWaterAmount(0);
      setError('Value must be a positive number');
      return;
    }

    if (value >= 50 && value <= 1500) {
      setWaterAmount(value);
      setError('');
    } else if (value > 1500) {
      setWaterAmount(1500);
      setError('Value must be between 50 and 1500');
    } else {
      setWaterAmount(value);
      setError('Value must be at least 50');
    }
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.header}>Edit the entered amount of water</h1>
        <p className={css.text}>Correct entered:</p>
        <p className={css.secondaryText}>Amount of water:</p>

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
            className={clsx(css.baseInput, timeError && css.errorInput)}
            value={time}
            onChange={e => {
              setTime(e.target.value);
              setTimeError(false);
            }}
            maxLength="5"
            placeholder="hh:mm"
          />
          {timeError && (
            <span className={css.error}>Time must be in hh:mm format</span>
          )}
        </label>

        <label className={css.secondaryLabel}>
          Enter the value of the water used:
          <input
            className={clsx(css.baseInput, error && css.errorInput)}
            type="number"
            value={waterAmount}
            onChange={handleInputChange}
          />
          {error && <span className={css.error}>{error}</span>}
        </label>

        <button className={css.saveBtn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditWaterModal;
