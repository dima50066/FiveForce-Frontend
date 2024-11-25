import React, { useId, useState } from 'react';
/* import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateAvatar } from '../../redux/user/operations.js';
*/
import Modal from '../../shared/Modal/Modal.jsx';
import css from './SettingModal.module.css';
import eye from '../../shared/Icons/eye.svg';
const SettingModal = () => {
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {nameId, emailId, timeId, weightId,amountId} = useId();

  /*
  
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector(state => state.auth); // отримуємо статус та користувача з Redu
  const [avatarFile, setAvatarFile] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  }; 
  */
  
  
  /* 
  const handleSubmit = async () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      try {
        await dispatch(updateAvatar(formData)).unwrap();
        alert('Avatar updated successfully!');
      } catch (error) {
        alert('Failed to update avatar');
      }
    }
  };
  
  const handleSubmitForm = evt => {
    evt.preventDefault();
    console.log(evt);
  };
  */
  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className={css.formCover}>
          <h2>Setting</h2>
          <form >
            <div>
              <p>Upload your avatar</p>
              <p>No avatar set</p>

              <input type="file" accept="image/*"  />

              <button>Update Avatar</button>
            </div>
            <h3>Your gender identity</h3>
            <label>
              <input type="radio" name="gender" value="woman" />
              Woman
            </label>
            <label>
              <input type="radio" name="gender" value="man" />
             Man
            </label>

            <label htmlFor={nameId}><h3>Your name</h3></label>
            <input type="text" id={nameId} />
            <label htmlFor={emailId}><h3>Email</h3></label>
            <input type="email" id={emailId} />
            <h3>My daily norma</h3>
            <p>For woman:</p>
            <p>V=(M*0,03) + (T*0,4)</p>
            <p>For man:</p>
            <p>V=(M*0,04) + (T*0,6)</p>
            <p>* V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)</p>
            <div>
              <img src={eye} alt="Mark" className={css.markIcon} />
              <p>Active time in hours</p>
            </div>
            <label htmlFor={weightId}>Your weight in kilograms:</label>
            <input type="number" id={weightId} />
            <label htmlFor={timeId}>The time of active participation in sports:</label>
            <input type="number" id={timeId} />
            <p>The required amount of water in liters per day:</p>
            <p>1.8 L</p>
            <label htmlFor={amountId}><h3>Write down how much water you will drink:</h3></label>
            <input type="number" id={amountId} />
            <button type="submit">Save</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SettingModal;
