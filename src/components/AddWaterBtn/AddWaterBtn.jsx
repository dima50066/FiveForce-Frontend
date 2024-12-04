import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWater } from '../../redux/water/operations';
import { selectActiveDay } from '../../redux/water/selectors';
import Icon from '../../shared/Icons/Icon';
import Modal from '../../shared/Modal/Modal.jsx';
import AddWaterModal from '../Modals/AddWaterModal/AddWaterModal.jsx';

import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);

  const openModal = () => {
    if (new Date(activeDay).getTime() > new Date().getTime()) {
      alert("You can't drink water in the future");
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
      .catch(error => {
        alert(error || 'Failed to add water');
      });
  };

  return (
    <>
      <button className={css.addWaterBtn} type="button" onClick={openModal}>
        <Icon className={css.iconPlus} id="icon-plus" width={16} height={16} />
        Add water
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddWaterModal onSave={handleSave} />
      </Modal>
    </>
  );
};

export default AddWaterBtn;
