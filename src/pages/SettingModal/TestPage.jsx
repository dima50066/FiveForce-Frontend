import React, { useState } from "react";
import SettingModal from "./SettingModal.jsx";

const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={openModal}>Open Modal</button>
      <SettingModal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Title</h2>
        <p>This is the content of the modal.</p>
      </SettingModal>
    </div>
  );
};

export default TestPage;