import React, { useState } from 'react';
import css from './AddWaterModal.module.css';
import Icon from '../../../shared/Icons/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';

const AddWaterModal = ({ onSave }) => {
  const { t } = useTranslation();
  const [waterAmount, setWaterAmount] = useState(50);
  const [time, setTime] = useState('07:00');
  const [error, setError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const handleDecrease = () => {
    const newAmount = Math.max(waterAmount - 50, 50);
    setWaterAmount(newAmount);
  };

  const handleIncrease = () => {
    const newAmount = Math.min(waterAmount + 50, 1500);
    setWaterAmount(newAmount);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      setTimeError(true);
      return;
    }

    if (waterAmount < 50 || waterAmount > 1500) {
      setError(true);
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
    toast.success('Water intake successfully saved!');
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
              waterAmount <= 50 && css.decrementBtn
            )}
            type="button"
            onClick={handleDecrease}
            disabled={waterAmount <= 50}
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
              waterAmount >= 1500 && css.incrementBtn
            )}
            type="button"
            onClick={handleIncrease}
            disabled={waterAmount >= 1500}
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
            placeholder={t('hh:mm')}
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
            type="number"
            value={waterAmount}
            onChange={e => {
              const value = Number(e.target.value);
              if (value < 50 || value > 1500) {
                setError(true);
              } else {
                setError(false);
                setWaterAmount(value);
              }
            }}
          />
          {error && (
            <span className={css.error}>
              {t('Value must be between 50 and 1500')}
            </span>
          )}
        </label>

        <button className={css.saveBtn} type="submit">
          {t('Save')}
        </button>
      </form>
    </div>
  );
};

export default AddWaterModal;
