import React, { useState, useEffect } from 'react';
import styles from './EditWaterModal.module.css';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Icon from '../../../shared/Icons/Icon';

const EditWaterModal = ({ waterId, currentWater, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [waterAmount, setWaterAmount] = useState(currentWater?.amount || 250);
  const [time, setTime] = useState(
    currentWater
      ? new Date(currentWater.date).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      : '07:00'
  );
  const [error, setError] = useState(false);

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
    setWaterAmount(prev => Math.max(prev - 50, 10));
  };

  const handleIncrease = () => {
    setWaterAmount(prev => Math.min(prev + 50, 3000));
  };

  const handleTimeChange = e => {
    setTime(e.target.value);
  };

  const handleInputChange = e => {
    setWaterAmount(e.target.value);
    setError(false);
  };

  const handleBlur = () => {
    const value = Number(waterAmount);
    if (value < 10 || value > 3000 || isNaN(value)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const value = Number(waterAmount);
    if (value < 10 || value > 3000 || isNaN(value)) {
      setError(true);
      toast.error(t('Value must be between 10 and 3000'));
      return;
    }

    try {
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(time)) {
        toast.error(t('Invalid time format. Please use HH:mm.'));
        return;
      }

      const [hours, minutes] = time.split(':').map(Number);

      // Використання дати з currentWater
      const selectedDate = new Date(currentWater.date);
      const updatedTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hours,
        minutes
      ).getTime();

      // Виклик onSave і обробка результату
      await onSave({
        id: waterId,
        updatedWater: { amount: value, date: updatedTime },
      });

      toast.success(t('Water entry updated successfully!'));
    } catch (error) {
      console.error(error);
      toast.error(t('Failed to update water entry. Please try again.'));
    }
  };

  return (
    <div className={styles['container']}>
      <form className={styles['form']} onSubmit={handleSubmit}>
        <h1 className={styles['header']}>
          {t('Edit the entered amount of water')}
        </h1>

        <div className={styles['counterContainer']}>
          <button
            className={clsx(
              styles['counterBtn'],
              waterAmount <= 10 && styles['decrementBtn']
            )}
            type="button"
            onClick={handleDecrease}
            disabled={waterAmount <= 10}
          >
            <Icon
              className={styles['iconMinus']}
              width="20"
              height="20"
              id="icon-minus"
            />
          </button>
          <p className={styles['count']}>
            {waterAmount} {t('ml')}
          </p>
          <button
            className={clsx(
              styles['counterBtn'],
              waterAmount >= 3000 && styles['incrementBtn']
            )}
            type="button"
            onClick={handleIncrease}
            disabled={waterAmount >= 3000}
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
          {t('Recording time:')}
          <input
            className={styles['baseInput']}
            value={time}
            onChange={handleTimeChange}
            maxLength="5"
            placeholder={t('hh:mm')}
          />
        </label>

        <label className={styles['secondaryLabel']}>
          {t('Enter the value of the water used:')}
          <input
            className={clsx(styles['baseInput'], error && styles['errorInput'])}
            type="text"
            value={waterAmount}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={t('Enter value')}
          />
          {error && (
            <span className={styles['error']}>
              {t('Value must be between 10 and 3000')}
            </span>
          )}
        </label>

        <div className={styles['buttonContainer']}>
          <button className={styles['saveBtn']} type="submit" disabled={error}>
            {t('Save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWaterModal;
