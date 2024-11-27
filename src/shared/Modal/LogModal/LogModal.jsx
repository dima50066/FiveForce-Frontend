import React from 'react';
import css from './LogModal.modal.css';

const LogModal = ({ onDelete, onCancel }) => {
  return (
    <div className="log-info">
      <h3 className="log-h2">Log out</h3>
      <p className="log-qestion">Do you really want to leave?</p>
      <div className="btns-log">
        <button className="log-first-btn" type="button">
          Log out
        </button>
        <button className="log-second-btn" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogModal;
