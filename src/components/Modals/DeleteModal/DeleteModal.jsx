import React from 'react';
import { toast } from 'react-hot-toast';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ waterId, onDelete, onCancel }) => {
  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success('Water successfully deleted!');
      await onDelete(waterId);
    } catch (error) {
      console.error('Delete failed:', error.message || error);
      toast.error('Failed to delete water. Please try again.');
    }
  };

  return (
    <div className={styles['delete-info']}>
      <h3 className={styles['delete-h3']}>Delete entry</h3>
      <p className={styles['delete-question']}>
        Are you sure you want to delete the entry?
      </p>
      <div className={styles['btns-delete-wrap']}>
        <button
          className={styles['delete-first-btn']}
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
          className={styles['delete-second-btn']}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
