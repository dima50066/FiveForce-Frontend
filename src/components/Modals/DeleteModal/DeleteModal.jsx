import React from 'react';
import css from './DeleteModal.module.css';
import { useTranslation } from "react-i18next";

const DeleteModal = ({ onDelete, onCancel }) => {
  const { t } = useTranslation();
  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error(t('Delete failed:'), error.message || error);
    }
  };

  return (
    <div className={css['delete-info']}>
      <h3 className={css['delete-h3']}>{t('Delete entry')}</h3>
      <p className={css['delete-question']}>
        {t('Are you sure you want to delete the entry?')}
      </p>
      <div className={css['btns-delete-wrap']}>
        <button
          className={css['delete-first-btn']}
          type="button"
          onClick={handleDelete}
        >
          {t('Delete')}
        </button>

        <button
          className={css['delete-second-btn']}
          type="button"
          onClick={onCancel}
        >
          {t('Cancel')}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
