import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWater } from '../../redux/water/operations';
import { selectActiveDay } from '../../redux/water/selectors';
import Modal from '../../shared/Modal/Modal.jsx';
import AddWaterModal from '../Modals/AddWaterModal/AddWaterModal.jsx';
import styles from './AddWaterRightBtn.module.css';
import { useTranslation } from 'react-i18next';

const AddWaterRightBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);
  const { t, i18n } = useTranslation();

  const openModal = () => {
    if (new Date(activeDay).getTime() > new Date().getTime()) {
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = data => {
    const newWater = {
      amount: data.amount,
      date: new Date(data.time).getTime(),
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
        className={styles.addWaterRightBtn}
        type="button"
        onClick={openModal}
      >
        <span className={styles.iconPlus}>+</span>
        {t('Add water')}
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddWaterModal onSave={handleSave} />
      </Modal>
    </>
  );
};

export default AddWaterRightBtn;
