import React from 'react';
import css from './DeleteModal.module.css';

const DeleteModal = ({ onDelete, onCancel }) => {
  return (
    <div className="delete-info">
      <h3 className="delete-h3">Delete entry</h3>
      <p className="delete-qestion">
        Are you sure you want to delete the entry?
      </p>
      <div className="btns-delete">
        <button className="delete-first-btn" type="button">
          Log out
        </button>
        <button className="delete-second-btn" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
