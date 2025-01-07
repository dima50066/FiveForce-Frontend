import React, { useState, useEffect } from 'react';
import css from './AddWaterModal.module.css';
import Icon from '../../../shared/Icons/Icon';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const AddWaterModal = ({ onSave }) => {
  const { t } = useTranslation();
  const [waterAmount, setWaterAmount] = useState(50);
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setTime(formattedTime);
  }, []);

  const handleDecrease = () => {
    const newAmount = Math.max(waterAmount - 50, 10);
    setWaterAmount(newAmount);
  };

  const handleIncrease = () => {
    const newAmount = Math.min(waterAmount + 50, 3000);
    setWaterAmount(newAmount);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      setTimeError(true);
      toast.error('Invalid time format. Please use HH:mm.');
      return;
    }

    if (waterAmount < 10 || waterAmount > 3000) {
      setError(true);
      toast.error(t('Value must be between 10 and 3000'));
      return;
    }

    const today = new Date();
    const [hours, minutes] = time.split(':');
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      hours,
      minutes
    );

    onSave({ amount: waterAmount, time: date });
    toast.success(t('Water intake successfully saved!'));
  };

  const handleWaterAmountChange = e => {
    const value = e.target.value;

    if (value === '') {
      setWaterAmount('');
      setError(false);
      return;
    }

    const numericValue = Number(value);
    if (isNaN(numericValue)) {
      setError(true);
    } else {
      setWaterAmount(numericValue);
      setError(numericValue < 10 || numericValue > 3000);
    }
  };

  const handleBlur = () => {
    if (waterAmount < 10 || waterAmount > 3000) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.header}>{t('Add water')}</h1>
        <p className={css.text}>{t('Choose a value:')}</p>
        <p className={css.secondaryText}>{t('Amount of water:')}</p>
        <div className={css.counterContainer}>
          <button
            className={clsx(
              css.counterBtn,
              waterAmount <= 10 && css.decrementBtn
            )}
            type="button"
            onClick={handleDecrease}
            disabled={waterAmount <= 10}
          >
            <Icon
              className={css.iconMinus}
              width="24"
              height="24"
              id="icon-minus"
            />
          </button>
          <p className={css.count}>{waterAmount} ml</p>
          <button
            className={clsx(
              css.counterBtn,
              waterAmount >= 3000 && css.incrementBtn
            )}
            type="button"
            onClick={handleIncrease}
            disabled={waterAmount >= 3000}
          >
            <Icon
              className={css.iconPlus}
              width="24"
              height="24"
              id="icon-plus"
            />
          </button>
        </div>
        <label className={css.baseLabel}>
          {t('Recording time:')}
          <input
            className={clsx(css.baseInput, timeError && css.errorInput)}
            value={time}
            onChange={e => {
              setTime(e.target.value);
              setTimeError(false);
            }}
            maxLength="5"
            placeholder={t('HH:MM')}
          />
          {timeError && (
            <span className={css.error}>
              {t('Time must be in hh:mm format')}
            </span>
          )}
        </label>
        <label className={css.secondaryLabel}>
          {t('Enter the value of the water used:')}
          <input
            className={clsx(css.baseInput, error && css.errorInput)}
            type="text"
            value={waterAmount}
            onChange={handleWaterAmountChange}
            onBlur={handleBlur}
            placeholder={t('Enter value')}
          />
          {error && (
            <span className={css.error}>
              {t('Value must be between 10 and 3000')}
            </span>
          )}
        </label>
        <button
          className={css.saveBtn}
          type="submit"
          disabled={error || waterAmount === ''}
        >
          {t('Save')}
        </button>
      </form>
    </div>
  );
};

export default AddWaterModal;
