import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWater } from '../../redux/water/operations';
import { selectActiveDay } from '../../redux/water/selectors';
import Icon from '../../shared/Icons/Icon';
import Modal from '../../shared/Modal/Modal.jsx';
import AddWaterModal from '../Modals/AddWaterModal/AddWaterModal.jsx';
import css from './AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);
  const { t, i18n } = useTranslation();
  const isUk = i18n.language === 'uk'; // Перевірка обраної мови

  const openModal = () => {
    if (new Date(activeDay).getTime() > new Date().getTime()) {
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = data => {
    const newWaterDate = new Date(data.time).getTime();
    const currentDate = new Date().getTime();

    if (newWaterDate > currentDate) {
      return;
    }

    const newWater = {
      amount: data.amount,
      date: newWaterDate,
    };

    dispatch(addWater(newWater))
      .unwrap()
      .then(() => {
        closeModal();
      })
      .catch(() => {});
  };

  return (
    <>
      <button
        className={`${css.addWaterBtn} ${isUk ? css.addWaterBtnUk : ''}`}
        type="button"
        onClick={openModal}
      >
        <Icon
          className={`${css.iconPlus} ${isUk ? css.iconPlusUk : ''}`}
          id="icon-plus"
          width={16}
          height={16}
        />
        {t('Add water')}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddWaterModal onSave={handleSave} />
      </Modal>
    </>
  );
};

export default AddWaterBtn;
