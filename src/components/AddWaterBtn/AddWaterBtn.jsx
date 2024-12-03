import { useState } from 'react';
import Icon from '../../shared/Icons/Icon';
import Modal from '../../shared/Modal/Modal.jsx';
import AddWaterModal from '../Modals/AddWaterModal/AddWaterModal.jsx';

import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = data => {
    console.log('Saved data:', data);
    closeModal();
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
