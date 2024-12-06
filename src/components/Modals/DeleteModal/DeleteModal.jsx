import React from 'react';
import css from './DeleteModal.module.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ waterId, onDelete, onCancel }) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      if (!waterId) {
        console.error('waterId is undefined');
        return;
      }
      await onDelete(waterId);
      toast.success(t('Water successfully deleted!'));
    } catch (error) {
      console.error('Delete failed:', error.message || error);
      toast.error(t('Failed to delete water. Please try again.'));
    }
  };

  return (
    <div className={css['delete-info']}>
      <h3 className={css['delete-h3']}>{t('Delete entry')}</h3>
      <p className={css['delete-question']}>
        {t('Are you sure you want to delete the entry?')}
      </p>
      <div className={styles['btns-delete-wrap']}>
        <button
          className={styles['delete-first-btn']}
          type="button"
          onClick={handleDelete}
        >
          {t('Delete')}
        </button>

        <button
          className={styles['delete-second-btn']}
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
