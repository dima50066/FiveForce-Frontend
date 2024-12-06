import React, { useState } from 'react';
import styles from '../WaterItem/WaterItem.module.css';
import EditWaterModal from '../../components/Modals/EditWaterModal/EditWaterModal';
import DeleteModal from '../../components/Modals/DeleteModal/DeleteModal';
import Icon from '../../shared/Icons/Icon';
import { useSelector, useDispatch } from 'react-redux';
import { selectDayWater } from '../../redux/water/selectors';
import { deleteWater, updateWater } from '../../redux/water/operations';
import clsx from 'clsx';
import Modal from '../../shared/Modal/Modal';

export default function WaterItem() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWaterId, setSelectedWaterId] = useState(null);
  const [selectedWaterAmount, setSelectedWaterAmount] = useState(null);
  const [selectedWaterTime, setSelectedWaterTime] = useState(null);

  const dispatch = useDispatch();
  const dataWaterOfDay = useSelector(selectDayWater);
  const waterData = dataWaterOfDay?.WaterData || [];

  const handleOpenDeleteModal = id => {
    setSelectedWaterId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedWaterId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async waterId => {
    try {
      await dispatch(deleteWater(waterId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting water entry:', error.message || error);
    }
  };

  const handleEdit = (id, amount, date) => {
    setIsEditModalOpen(true);
    setSelectedWaterId(id);
    setSelectedWaterAmount(amount);
    setSelectedWaterTime(date);
  };

  const handleSaveEdit = async updatedData => {
    try {
      await dispatch(updateWater(updatedData));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating water entry:', error.message || error);
    }
  };

  return (
    <>
      {waterData.length > 0 ? (
        <ul className={styles.list}>
          {waterData.map(water => (
            <li key={water._id} className={styles.item}>
              <div className={styles.content}>
                <Icon
                  className={styles.iconGlass}
                  width={44}
                  height={45}
                  id="icon-water-glass"
                />
                <div>
                  <strong>{water.amount} ml</strong>
                  <p className={styles.date}>
                    {new Date(water.date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={styles.editButton}
                    onClick={() =>
                      handleEdit(water._id, water.amount, water.date)
                    }
                  >
                    <Icon
                      className={styles.iconEdit}
                      width={16}
                      height={16}
                      id="icon-edit"
                    />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleOpenDeleteModal(water._id)}
                  >
                    <Icon
                      className={styles.iconDelete}
                      width={16}
                      height={16}
                      id="trash"
                    />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noRecords}>
          <Icon
            className={styles.iconGlass}
            width={44}
            height={45}
            id="icon-water-glass"
          />
          <p className={clsx(styles.text)}>No records found</p>
        </div>
      )}

      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
        >
          <EditWaterModal
            onSave={handleSaveEdit}
            waterId={selectedWaterId}
            currentWater={{
              amount: selectedWaterAmount,
              date: selectedWaterTime,
            }}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </Modal>
      )}
      {isDeleteModalOpen && (
        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <DeleteModal
            onDelete={handleDelete}
            waterId={selectedWaterId}
            onCancel={handleCloseDeleteModal}
          />
        </Modal>
      )}
    </>
  );
}
