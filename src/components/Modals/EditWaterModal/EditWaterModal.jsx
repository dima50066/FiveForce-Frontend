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

    try {
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(time)) {
    toast.error('Invalid time format. Please use HH:mm.');
    return;
  }
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

      toast.success(t('Water entry updated successfully!'));
    } catch (error) {
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
          <p className={styles['count']}>
            {waterAmount} {t('ml')}
          </p>
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
          {t('Recording time')}:
          <input
            className={styles['baseInput']}
            value={time}
            onChange={handleTimeChange}
            maxLength="5"
            placeholder={t('hh:mm')}
          />
        </label>

        <label className={styles['secondaryLabel']}>
          {t('Enter the value of the water used')}:
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
            {t('Save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWaterModal;
