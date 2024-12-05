import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './DailyStats.module.css';
import WaterList from '../WaterList/WaterList';
import AddWaterRightBtn from '../AddWaterRightBtn/AddWaterRightBtn';
import Modal from '../../shared/Modal/Modal';
import EditWaterModal from '../Modals/EditWaterModal/EditWaterModal';
import DeleteModal from '../Modals/DeleteModal/DeleteModal';
import { getDayWater } from '../../redux/water/operations';
import { selectActiveDay, selectDayWater } from '../../redux/water/selectors';
import { setActiveDay } from '../../redux/water/slice';

export default function DailyStats() {
  const dispatch = useDispatch();

  const activeDay = useSelector(selectActiveDay);
  const dayWater = useSelector(selectDayWater)?.WaterData || [];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (!activeDay) {
      const now = new Date();
      const currentDate = now.toISOString();
      dispatch(setActiveDay(currentDate));
    }
  }, [dispatch, activeDay]);

  useEffect(() => {
    if (activeDay) {
      dispatch(getDayWater(activeDay));
    }
  }, [activeDay, dispatch]);

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

  return (
    <div className={css.dailyStats}>
      <div className={css.header}>
        <h2 className={css.date}>
          {new Date(activeDay).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
          })}
        </h2>
        <AddWaterRightBtn onAddWater={() => {}} />
      </div>
      <div className={css.waterListContainer}>
        <WaterList
          waterData={dayWater}
          onDelete={openDeleteModal}
          onEdit={openEditModal}
        />
      </div>

      <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        <EditWaterModal item={currentItem} onClose={closeModal} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
        <DeleteModal item={currentItem} onClose={closeModal} />
      </Modal>
    </div>
  );
}
