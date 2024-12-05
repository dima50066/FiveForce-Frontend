import React from 'react';
import css from './DeleteModal.module.css';
import { toast } from 'react-hot-toast';

const DeleteModal = ({ onDelete, onCancel }) => {
  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success('Water successfully deleted!');
    } catch (error) {
      console.error('Delete failed:', error.message || error);
      toast.error('Failed to delete water. Please try again.');
    }
  };

  return (
    <div className={css['delete-info']}>
      <h3 className={css['delete-h3']}>Delete entry</h3>
      <p className={css['delete-question']}>
        Are you sure you want to delete the entry?
      </p>
      <div className={css['btns-delete-wrap']}>
        <button
          className={css['delete-first-btn']}
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>

        <button
          className={css['delete-second-btn']}
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
