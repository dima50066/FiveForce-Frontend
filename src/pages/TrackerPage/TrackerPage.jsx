import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/user/selectors';
import LogModal from '../../components/Modals/LogModal/LogModal';
import Modal from '../../shared/Modal/Modal';

const TrackerPage = () => {
  const [isLogModalOpen, setLogModalOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const openLogModal = () => setLogModalOpen(true);
  const closeLogModal = () => {
    setLogModalOpen(false);
  };

  return (
    <div>
      <h1>Track Your Water Intake</h1>
      <p>Log your daily hydration and stay healthy!</p>
      {isLoggedIn && (
        <button type="button" onClick={openLogModal}>
          Open Log Modal
        </button>
      )}
      <Modal isOpen={isLogModalOpen} onClose={closeLogModal}>
        <LogModal onCancel={closeLogModal} />
      </Modal>
    </div>
  );
};

export default TrackerPage;
