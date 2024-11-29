import { useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from '../../shared/Icons/Icon';
import Modal from '../../shared/Modal/Modal.jsx';

import css from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  // const [showWaterModal, setShowWaterModal] = useState(false);
  // const isShowWaterModal = useSelector(selectShowWaterModal);

  // const openWaterModal = () => setShowWaterModal(true);
  // const closeWaterModal = () => {
  //   setShowWaterModal(false);
  // };

  return (
    <>
      <button className={css.addWaterBtn} type="button">
        <Icon className={css.iconPlus} id="icon-plus" width={16} height={16} />
        Add water
      </button>

      {/* <Modal isOpen={isShowWaterModal} onClose={closeWaterModal}>
        <LogModal onCancel={closeLogModal} />
      </Modal> */}
    </>
  );
};

export default AddWaterBtn;
