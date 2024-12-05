import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import { selectActiveDay, selectDayWater } from '../../redux/water/selectors';
import css from './DailyStats.module.css';
import WaterList from '../WaterList/WaterList';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn';
import Modal from '../../shared/Modal/Modal';
import EditWaterModal from '../Modals/EditWaterModal/EditWaterModal';
import DeleteModal from '../Modals/DeleteModal/DeleteModal';
import { deleteWater, updateWater } from '../../redux/water/operations';

export default function DailyStats() {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);
  const dayWater = useSelector(selectDayWater)?.WaterData || [];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const openEditModal = item => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = item => {
    setCurrentItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentItem(null);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteWater(currentItem.id));
      closeModal();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleSave = ({ id, updatedWater }) => {
    dispatch(updateWater({ id, updatedWater }));
    closeModal();
  };

  return (
    <div className={css.dailyStats}>
      <div className={css.header}>
        <h2 className={css.date}>
          {new Date(activeDay).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
          })}
        </h2>
        <AddWaterBtn onAddWater={() => {}} />
      </div>
      <div className={css.waterListContainer}>
        <WaterList
          waterData={dayWater}
          onDelete={openDeleteModal}
          onEdit={openEditModal}
        />
      </div>

      <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        {currentItem && (
          <EditWaterModal
            currentWater={{
              amount: currentItem.amount,
              time: currentItem.time,
            }}
            id={currentItem.id}
            onSave={handleSave}
          />
        )}
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
        <DeleteModal onDelete={handleDelete} onCancel={closeModal} />
      </Modal>
    </div>
  );
}
