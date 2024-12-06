import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectActiveDay, selectDayWater } from '../../redux/water/selectors';
import css from './DailyStats.module.css';
import WaterList from '../WaterList/WaterList';
import AddWaterRightBtn from '../AddWaterRightBtn/AddWaterRightBtn';
import { deleteWater, updateWater } from '../../redux/water/operations';

export default function DailyStats() {
  const dispatch = useDispatch();
  const activeDay = useSelector(selectActiveDay);

  const [currentItem, setCurrentItem] = useState(null);

  const closeModal = () => {
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
        <AddWaterRightBtn />
      </div>
      <WaterList />
    </div>
  );
}
