import React, { useId, useRef, useState } from 'react';
/* import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateAvatar } from '../../redux/user/operations.js';
import { fetchUser } from 'redux/user/operations.js';
*/
import { AiOutlineUser } from 'react-icons/ai';

import Modal from '../../shared/Modal/Modal.jsx';
import css from './SettingModal.module.css';
import Icon from '../../shared/Icons/Icon.jsx';

const SettingModal = () => {
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // All for inputFile upload photo
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  //All for gender checkbox
  const [gender, setGender] = useState('woman');
  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  // Generation of identifiers
  const nameId = useId();
  const emailId = useId();
  const timeId = useId();
  const weightId = useId();
  const amountId = useId();
  const radioIdWoman = useId();
  const radioIdMan = useId();
  const fileInputId = useId();

  
  /*
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth); 
 
  useEffect(() => {
    dispatch(fetchUser());  
  }, [dispatch]);

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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className={css.modelForm}
      >
        <div className={css.formCover}>
          <h2 className={css.title}>Setting</h2>
          <form className={css.form}>
            <div className={css.avatarCover}>
              {preview ? (
                <img src={preview} alt="Avatar Preview" className={css.img} />
              ) : (
                <div className={css.imgFake}>
                  <AiOutlineUser className={css.iconFake} />
                </div>
              )}
              <div className={css.fileUpload}>
                <input
                  ref={fileInputRef}
                  id={fileInputId}
                  className={css.inputFile}
                  onChange={handleFileChange}
                  type="file"
                  accept="image/*"
                />
                <label htmlFor={fileInputId} className={css.customUpload}>
                  <Icon
                    className={css.uploadIcon}
                    id="upload"
                    width={20}
                    height={20}
                  />
                </label>
                <button className={css.btnUpload} onClick={handleButtonClick}>
                  Upload a photo
                </button>
              </div>
            </div>
            <div className={css.partCover}>
              <h3 className={css.secondTitle}>Your gender identity</h3>
              <div className={css.radioCover}>
                <input
                  id={radioIdWoman}
                  className={css.inputRadio}
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={gender === 'woman'}
                  onChange={handleGenderChange}
                />
                <label htmlFor={radioIdWoman} className={css.labelRadio}>
                  Woman
                </label>
                <input
                  id={radioIdMan}
                  className={css.inputRadio}
                  type="radio"
                  name="gender"
                  value="man"
                  checked={gender === 'man'}
                  onChange={handleGenderChange}
                />
                <label htmlFor={radioIdMan} className={css.labelRadio}>
                  Man
                </label>
              </div>
            </div>
            <div className={`${css.partCover} ${css.box}`}>
              <div>
                <label htmlFor={nameId}>
                  <h3 className={css.secondTitle}>Your name</h3>
                </label>
                <input
                  type="text"
                  id={nameId}
                  className={css.input} // value={user?.name || ''} disabled={isLoading} Автоматично заповнюємо полем name з даними користувача
                />
              </div>
              <div>
                <label htmlFor={emailId}>
                  <h3 className={css.secondTitle}>Email</h3>
                </label>
                <input
                  type="email"
                  id={emailId}
                  className={css.input}
                  placeholder="nadia10@gmail.com"
                />
              </div>
            </div>
            <div className={css.partCover}>
              <h3 className={css.secondTitle}>My daily norma</h3>
              <p className={css.descr}>For woman:</p>
              <p className={css.greenDscr}>V=(M*0,03) + (T*0,4)</p>
              <p className={css.descr}>For man:</p>
              <p className={css.greenDscr}>V=(M*0,04) + (T*0,6)</p>
              <p className={css.formulaDescr}>
                * V is the volume of the water norm in liters per day, M is your
                body weight, T is the time of active sports, or another type of
                activity commensurate in terms of loads (in the absence of
                these, you must set 0)
              </p>
              <div className={css.coverMarkIcon}>
                <Icon className={css.icon} id="eye" width={20} height={20} />
                <p className={css.descr}>Active time in hours</p>
              </div>
            </div>
            <div className={`${css.partCover} ${css.box}`}>
              <div>
                <label htmlFor={weightId} className={css.descr}>
                  Your weight in kilograms:
                </label>
                <input type="number" id={weightId} className={css.input} />
              </div>
              <div>
                <label htmlFor={timeId} className={css.descr}>
                  The time of active participation in sports:
                </label>
                <input type="number" id={timeId} className={css.input} />
              </div>
            </div>
            <p className={css.descr}>
              The required amount of water in liters per day:
            </p>
            <p className={css.greenDscr}>1.8 L</p>
            <label htmlFor={amountId}>
              <h3 className={css.secondTitle}>
                Write down how much water you will drink:
              </h3>
            </label>
            <input type="number" id={amountId} className={css.input} />
            <button type="submit" className={css.btnSubmit}>
              Save
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SettingModal;
