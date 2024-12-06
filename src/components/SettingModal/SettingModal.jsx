import React, { useEffect, useId, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AiOutlineUser } from 'react-icons/ai';
import css from './SettingModal.module.css';
import Icon from '../../shared/Icons/Icon.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/user/operations.js';
import { selectUserAvatar } from '../../redux/user/selectors.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'; 

const SettingModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);
  const userAvatar = useSelector(selectUserAvatar);
  const [preview, setPreview] = useState(userAvatar || null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();


 useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modalOpen');
    } else {
      document.body.classList.remove('modalOpen');
    }
    return () => document.body.classList.remove('modalOpen');
 }, [isOpen]);
  
  
  /* Validation*/

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('Name is required'))
      .min(3, t('Name must be at least 3 characters')),
    email: Yup.string()
      .email(t('Invalid email'))
      .required(t('Email is required')),
    weight: Yup.number()
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      )
      .nullable()
      .min(0, t('Weight must be at least 0 kg'))
      .max(300, t('Weight must be less than 300 kg')),
    activeHours: Yup.number()
      .transform((value, originalValue) =>
        originalValue === '' ? null : value
      )
      .nullable()
      .min(0, t('Cannot be less than 0'))
      .max(24, t('Cannot be more than 24 hours')),
    waterIntake: Yup.number()
      .required(t('Water intake is required'))
      .min(1.5, t('Cannot be less than 1.5'))
      .max(5, t('Cannot be more than 5 liters'))
      .transform((value, originalValue) =>
        originalValue === '' ? 1.5 : parseFloat(value)
      ),
    gender: Yup.string().required(t('Gender is required')),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      weight: user?.weight || '0',
      activeHours: user?.activeHours || '0',
      waterIntake: user?.dailyNorm || '1.5',
      gender: user?.gender || 'woman',
      avatar: null,
    },
  });
  /* send Submit */
  const onSubmit = async data => {
    setIsLoading(true);

    const formData = new FormData();
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('activeTime', data.activeHours);
    formData.append('dailyNorm', data.waterIntake * 1000);
    formData.append('gender', data.gender);

    try {
      const result = await dispatch(updateUser(formData)).unwrap();
      toast.success(t('Data sent successfully!'));
      onClose();
    } catch (error) {
      toast.error(t('Oops! Something went wrong!'));
    } finally {
      setIsLoading(false);
    }
  };

  /* changing Avatar */

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setValue('avatar', file);
    }
  };

  const nameId = useId();
  const emailId = useId();
  const timeId = useId();
  const weightId = useId();
  const amountId = useId();
  const radioIdWoman = useId();
  const radioIdMan = useId();
  const fileInputId = useId();

  useEffect(() => {
    if (isOpen) {
      const initialWaterIntake = calculateWaterIntake(
        user?.weight || 0,
        user?.activeTime || 0,
        user?.gender || 'woman'
      );
      setWaterIntake(Math.max(initialWaterIntake, 1.5).toFixed(2));
      setValue('waterIntake', Math.max(initialWaterIntake, 1.5).toFixed(2));
    }
  }, [isOpen, user, setValue]);

  const [waterIntake, setWaterIntake] = useState(
    user?.dailyNorm ? user.dailyNorm / 1000 : 1.5
  );

  const calculateWaterIntake = (
    weight = 0,
    activeTime = 0,
    gender = 'woman'
  ) => {
    let intake = 1.5;
    if (gender === 'woman') {
      intake = weight * 0.03 + activeTime * 0.4;
    } else if (gender === 'man') {
      intake = weight * 0.04 + activeTime * 0.6;
    }
    return Math.min(intake, 5);
  };

  const handleInputChange = () => {
    const weight = parseFloat(getValues('weight')) || 0;
    const activeHours = parseFloat(getValues('activeHours')) || 0;
    const gender = getValues('gender') || 'woman';
    const calculatedWaterIntake = calculateWaterIntake(
      weight,
      activeHours,
      gender
    );
    setWaterIntake(Math.max(calculatedWaterIntake, 1.5).toFixed(2));
    setValue('waterIntake', Math.max(calculatedWaterIntake, 1.5).toFixed(2));
  };

    return isOpen ? (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.header}>
        <h2 className={css.title}>{t('Setting')}</h2>
        <LanguageSwitcher />
      </div>
      <div className={css.avatarCover}>
        {preview ? (
          <img src={preview} alt="Avatar Preview" className={css.img} />
        ) : (
          <AiOutlineUser className={css.iconFake} />
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
            <Icon className={css.uploadIcon} id="upload" />
            <span className={css.btnUpload}>{t('Upload a photo')}</span>
          </label>
        </div>
      </div>

      <div className={css.partCover}>
        <h3 className={css.secondTitle}>{t('Your gender identity')}</h3>
        <div className={css.radioCover}>
          <input
            id={radioIdWoman}
            className={css.inputRadio}
            type="radio"
            name="gender"
            value="woman"
            checked={getValues('gender') === 'woman'}
            {...register('gender')}
            onChange={e => {
              setValue('gender', e.target.value);
              handleInputChange();
            }}
          />
          <label htmlFor={radioIdWoman} className={css.labelRadio}>
            {t('Woman')}
          </label>
          <input
            id={radioIdMan}
            className={css.inputRadio}
            type="radio"
            name="gender"
            value="man"
            {...register('gender')}
            onChange={e => {
              setValue('gender', e.target.value);
              handleInputChange();
            }}
          />
          <label htmlFor={radioIdMan} className={css.labelRadio}>
            {t('Man')}
          </label>
        </div>
      </div>
      <div className={css.coverForLaptop}>
        <div className={css.miniCoverLaptop}>
          <div className={`${css.partCover} ${css.box}`}>
            <div>
              <label htmlFor={nameId} className={css.secondTitle}>
                {t('Your name')}
              </label>
              <input
                type="text"
                id={nameId}
                className={`${css.input} ${errors.name ? css.errorInput : ''}`}
                {...register('name')}
              />
              {errors.name && (
                <span className={css.error}>{errors.name.message}</span>
              )}
            </div>
            <div>
              <label htmlFor={emailId} className={css.secondTitle}>
                {t('Email')}
              </label>
              <input
                type="email"
                id={emailId}
                className={`${css.input} ${errors.email ? css.errorInput : ''}`}
                {...register('email')}
              />
              {errors.email && (
                <span className={css.error}>{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className={`${css.partCover} ${css.withoutMargin}`}>
            <h3 className={`${css.secondTitle} ${css.updateDailyUp}`}>
              {t('My daily norma')}
            </h3>
            <div className={css.formulaCover}>
              <div>
                <p className={css.descr}>{t('For woman')}:</p>
                <p className={css.greenDscr}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div>
                <p className={css.descr}>{t('For man')}:</p>
                <p className={css.greenDscr}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>
            <p className={css.formulaDescr}>
              <span className={css.formulaStar}>*</span>{' '}
              {t(
                'V is the volume of the water norm in liters per day, M is your body weight, T is the time of active sports, or another type of activity commensurate in terms of loads (in the absence of these, you must set 0)'
              )}
            </p>
            <h3 className={`${css.secondTitle} ${css.updateDailyDown}`}>
              {t('My daily norma')}
            </h3>
            <div className={css.coverMarkIcon}>
              <Icon id="icon-alert" width={18} height={18} />
              <p className={`${css.descr} ${css.actives}`}>
                {t('Active time in hours')}
              </p>
            </div>
          </div>
        </div>
        <div className={css.miniCoverLaptop}>
          <div className={`${css.partCover} ${css.box}`}>
            <div>
              <label htmlFor={weightId} className={css.descr}>
                {t('Your weight in kilograms:')}
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
                    onChange={e => {
                      setValue('weight', e.target.value);
                      handleInputChange();
                    }}
                  />
                )}
              />
              {errors.weight && (
                <span className={css.error}>{errors.weight.message}</span>
              )}
            </div>
            <div>
              <label htmlFor={timeId} className={css.descr}>
                {t('The time of active participation in sports:')}
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
                    onChange={e => {
                      setValue('activeHours', e.target.value);
                      handleInputChange();
                    }}
                  />
                )}
              />
              {errors.activeHours && (
                <span className={css.error}>{errors.activeHours.message}</span>
              )}
            </div>
          </div>
          <div className={css.limitAmount}>
            <p className={`${css.descr} ${css.descrTablet}`}>
              {t('The required amount of water in liters per day:')}
            </p>
            <p className={css.greenDscr}>
              {waterIntake} {t('L')}
            </p>
          </div>
          <label htmlFor={amountId} className={css.secondTitle}>
            {t('Write down how much water you will drink:')}
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
                value={waterIntake}
                onChange={e => {
                  const value = parseFloat(e.target.value) || 1.5;
                  setWaterIntake(value);
                  field.onChange(e);
                }}
              />
            )}
          />
          {errors.waterIntake && (
            <span className={css.error}>{errors.waterIntake.message}</span>
          )}
        </div>
      </div>

      <button type="submit" className={css.btnSubmit}>
        {isLoading ? t('Saving...') : t('Save')}
      </button>
    </form>
  ) : null;
};

export default SettingModal;
