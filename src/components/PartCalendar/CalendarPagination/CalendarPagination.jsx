import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import css from './CalendarPagination.module.css';
import Icon from '../../../shared/Icons/Icon';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function PaginationControls({
  onNext,
  onPrevious,
  currentDate,
  isStatistics,
  toggleStatistics,
}) {
  const isPreviousDisabled =
    new Date(currentDate).getTime() <
    new Date('2023-02-01T00:00:00.000Z').getTime();
  const { t } = useTranslation();
  const monthNames = [
    t('January'),
    t('February'),
    t('March'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ];

  return (
    <div className={css.paginationControlsContainer}>
      {!isStatistics && (
        <div className={css.navigationButtonsContainer}>
          <button
            className={css.navigationButton}
            disabled={isPreviousDisabled}
            onClick={onPrevious}
          >
            <FaAngleLeft fill="#323f47"/>
          </button>
          <p className={css.title}>
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </p>
          <button className={css.navigationButton} onClick={onNext}>
            <FaAngleRight fill="#323f47" />
          </button>
        </div>
      )}
      <button
        className={css.toggleButton}
        type="button"
        onClick={toggleStatistics}
      >
        <Icon
          className={clsx(css.icon, isStatistics && css.iconActive)}
          id="pieChart"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
}
