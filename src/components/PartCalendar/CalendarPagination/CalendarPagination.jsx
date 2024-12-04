import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import css from './CalendarPagination.module.css';
import Icon from '../../../shared/Icons/Icon';

import clsx from 'clsx';

export default function PaginationControls({
  isOpen,
  toggleOpenState,
  onNext,
  onPrevious,
  currentDate,
}) {
  const isPreviousDisabled =
    new Date(currentDate).getTime() <
    new Date('2023-02-01T00:00:00.000Z').getTime();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className={css.paginationControlsContainer}>
      <div className={css.navigationButtonsContainer}>
        <button
          className={css.navigationButton}
          disabled={isPreviousDisabled}
          onClick={onPrevious}
        >
          <FaAngleLeft />
        </button>
        <p className={css.title}>
          {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
        </p>
        <button className={css.navigationButton} onClick={onNext}>
          <FaAngleRight />
        </button>
      </div>
      <button
        className={css.toggleButton}
        type="button"
        onClick={toggleOpenState}
      >
        <Icon
          className={clsx(css.icon, !isOpen && css.iconInactive)}
          id="pieChart"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
}
