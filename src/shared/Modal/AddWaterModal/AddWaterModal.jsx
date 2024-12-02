import React from 'react';
import css from './AddWaterModal.module.css';

const AddWaterModal = {{ onSave }} => {
  return (
    <div className='add-water-modal'>
      <h1 className='add-modal'>Add water</h1>

      <form>
        <h3 className='title-choose'>Choose a value</h3>
        <p className='paragr-amount'>Amount of water:</p>

        <div className='section-btn-add'>
          <button className='title-btn-minus' type="button" aria-label="Decrease">ICON-MINUS
            <svg
    xmlns="/src/"
    width="40"
    height="40"
    fill="#323F47"
    radius={30}
    viewBox="0 0 16 16"
  >
    <path d="" />
  </svg>
          </button>
          <p className="water-paragraph">50 ml</p>
          <button className='title-btn-plus' type="button" aria-label="Increase">ICON-PLUS
             <svg
    xmlns=""
    width="40"
    height="40"
    fill="#323F47"
    radius={30}
    viewBox="0 0 16 16"
  >
    <path d="" />
  </svg>
          </button>
        </div>
        <p className='paragr-recording-add'>Recording time:</p>
        <label>
          <input className='recording-input-time' type="checkbox" name="option1"/>
            <span>7:00</span>
        </label>
        <p className='paragr-enter-add'>Enter the value of the water used:</p>
        <label>
          <input className='enter-input-volume' type="checkbox" name="option2"/>
            <span>50</span>
        </label>

        <button className='btn-save' type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddWaterModal;
