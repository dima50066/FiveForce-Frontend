import React from 'react';
import css from './EditWaterModal.module.css';

const EditWaterModal = {{ onSave }} => {
  return (
    <div className='edit-water-modal'>
      <h1 className='title-modal'>Edit the entered amount of water</h1>

      <form>
        <h3 className='title-correct'>Correct entered data:</h3>
        <p className='paragr-amount'>Amount of water:</p>

        <div className='section-btn'>
          <button className='title-btn-decrease' type="button" aria-label="Decrease">ICON-MINUS
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
          <p className="water-paragr">250 ml</p>
          <button className='title-btn-increace' type="button" aria-label="Increase">ICON-PLUS
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
        <p className='paragr-recording'>Recording time:</p>
        <label>
          <input className='recording-input' type="checkbox" name="option1"/>
            <span>7:00</span>
        </label>
        <p className='paragr-enter'>Enter the value of the water used:</p>
        <label>
          <input className='enter-input' type="checkbox" name="option2"/>
            <span>250</span>
        </label>

        <button className='btn-save' type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditWaterModal;
