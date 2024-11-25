import React, { useState } from "react";
import Modal from "../../shared/Modal/Modal.jsx";
import XClose from "../../shared/Icons/xClose.svg"

const SettingModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
       
        <h2>Setting</h2>
        <div>
          <button>Upload a photo</button>
        </div>
        
      </Modal>
    </div>
  );
};

export default SettingModal;