import React, { useState, useEffect } from 'react';
import css from './EditWaterModal.module.css';
import Icon from '../../../shared/Icons/Icon';
import clsx from 'clsx';
import { useTranslation } from "react-i18next";

const EditWaterModal = ({ currentWater, id, onSave }) => {
  const { t } = useTranslation();
  const [waterAmount, setWaterAmount] = useState(currentWater?.amount || 250);
  const [time, setTime] = useState(currentWater?.time || '07:00');
  const [error, setError] = useState(false);
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

    onSave({ id, updatedWater: { amount: waterAmount, time } });
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.header}>{t('Edit the entered amount of water')}</h1>
        <p className={css.text}>{t('Correct entered:')}</p>
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
            <span className={css.error}>{t('Time must be in hh:mm format')}</span>
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
            <span className={css.error}>{t('Value must be between 50 and 1500')}</span>
          )}
        </label>

        <button className={css.saveBtn} type="submit">
          {t('Save')}
        </button>
      </form>
    </div>
  );
};

export default EditWaterModal;
