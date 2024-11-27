import React, { useId, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AiOutlineUser } from 'react-icons/ai';

import Modal from '../../shared/Modal/Modal.jsx';
import css from './SettingModal.module.css';
import Icon from '../../shared/Icons/Icon.jsx';

const SettingModal = () => {
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [waterIntake, setWaterIntake] = useState(1.5);
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    weight: Yup.number()
      .transform((value, originalValue) =>
      originalValue === '' ? null : value
    )
       .nullable()
      .min(0, 'Weight must be at least 0 kg')
      .max(300, 'Weight must be less than 300 kg'),
    activeHours: Yup.number()
       .transform((value, originalValue) =>
      originalValue === '' ? null : value
    )
       .nullable()
      .min(0, 'Cannot be less than 0')
      .max(24, 'Cannot be more than 24 hours'),
    waterIntake: Yup.number()
      .required('Water intake is required')
      .min(1.5, 'Cannot be less than 1.5')
      .max(5, 'Cannot be more than 5 liters'),
    gender: Yup.string().required('Gender is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      weight: '0',
      activeHours: '0',
      waterIntake: '1.5',
      gender: 'woman',
    },
  });

  const onSubmit = async data => {
    const formData = new FormData();
    if (data.avatar) {
      formData.append('avatar', data.avatar[0]);
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('activeHours', data.activeHours);
    formData.append('waterIntake', data.waterIntake);
    formData.append('gender', data.gender);

    try {
      
      const response = await fetch('/your-api-endpoint', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // All for inputFile upload photo
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };
  const handleButtonClick = () => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  //All for gender checkbox

  const handleChangeWater = e => setValue(e.target.value);

  // Generation of identifiers
  const nameId = useId();
  const emailId = useId();
  const timeId = useId();
  const weightId = useId();
  const amountId = useId();
  const radioIdWoman = useId();
  const radioIdMan = useId();
  const fileInputId = useId();

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
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
                  type="file"
                  accept="image/*"
                  {...register('avatar')}
                  onChange={handleFileChange}
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
                  {...register('gender')}
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
                  {...register('gender')}
                />
                <label htmlFor={radioIdMan} className={css.labelRadio}>
                  Man
                </label>
              </div>
              {errors.gender && <span className={css.error}>{errors.gender.message}</span>}
            </div>
            <div className={`${css.partCover} ${css.box}`}>
              <div>
                <label htmlFor={nameId}>
                  <h3 className={css.secondTitle}>Your name</h3>
                </label>
                <input
                  type="text"
                  id={nameId}
                  className={`${css.input} ${errors.name ? css.errorInput : ''}`}
                  {...register('name')}

                  /* value={user?.name || ''} disabled={isLoading} Автоматично заповнюємо полем name з даними користувача*/
                />
                {errors.name && <span className={css.error}>{errors.name.message}</span>}
              </div>
              <div>
                <label htmlFor={emailId}>
                  <h3 className={css.secondTitle}>Email</h3>
                </label>
                <input
                  type="email"
                  id={emailId}
                  className={`${css.input} ${errors.email ? css.errorInput : ''}`}
                  {...register('email')}
                />
                {errors.email && <span className={css.error}>{errors.email.message}</span>}
              </div>
            </div>
            <div className={css.partCover}>
              <div className={css.formulaCover}>
                <div>
                  <p className={css.descr}>For woman:</p>
                  <p className={css.greenDscr}>V=(M*0,03) + (T*0,4)</p>
                </div>
                <div>
                  <p className={css.descr}>For man:</p>
                  <p className={css.greenDscr}>V=(M*0,04) + (T*0,6)</p>
                </div>
              </div>
              <p className={css.formulaDescr}>
                <span className={css.formulaStar}>*</span> V is the volume of
                the water norm in liters per day, M is your body weight, T is
                the time of active sports, or another type of activity
                commensurate in terms of loads (in the absence of these, you
                must set 0)
              </p>
              <h3 className={css.secondTitle}>My daily norma</h3>
              <div className={css.coverMarkIcon}>
                <Icon className={css.icon} id="eye" width={18} height={18} />
                <p className={`${css.descr} ${css.actives}`}>
                  Active time in hours
                </p>
              </div>
            </div>
            <div className={`${css.partCover} ${css.box}`}>
              <div>
                <label htmlFor={weightId} className={css.descr}>
                  Your weight in kilograms:
                </label>
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      id={weightId}
                      className={`${css.input} ${errors.weight ? css.errorInput : ''}`}
                      {...field}
                    />
                  )}
                />
                {errors.weight && <span className={css.error}>{errors.weight.message}</span>}
              </div>
              <div>
                <label htmlFor={timeId} className={css.descr}>
                  The time of active participation in sports:
                </label>
                <Controller
                  name="activeHours"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      id={timeId}
                      className={`${css.input} ${errors.activeHours ? css.errorInput : ''}`}
                      {...field}
                    />
                  )}
                />
                {errors.activeHours && (
                  <span className={css.error}>{errors.activeHours.message}</span>
                )}
              </div>
            </div>
            <div className={css.limitAmount}>
              <p className={css.descr}>
                The required amount of water in liters per day:
              </p>
              <p className={css.greenDscr}>{waterIntake} L</p>
            </div>
            <label htmlFor={amountId}>
              <h3 className={css.secondTitle}>
                Write down how much water you will drink:
              </h3>
            </label>
            <Controller
                name="waterIntake"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    id={amountId}
                    step="0.1"
                    className={`${css.input} ${errors.waterIntake ? css.errorInput : ''}`}
                    {...field}
                    value={waterIntake} // Значення з state
                    onChange={e => {
                      const value = parseFloat(e.target.value) || 0; // Перевірка на число
                      setWaterIntake(value); // Оновлення стану
                      field.onChange(e);
                    }}
                  />
                )}
              />
              {errors.waterIntake && (
                <span className={css.error}>{errors.waterIntake.message}</span>
              )}
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
