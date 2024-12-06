import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { selectActiveDay, selectDayWater } from '../../redux/water/selectors';
import css from './DailyStats.module.css';
import WaterList from '../WaterList/WaterList';
import AddWaterRightBtn from '../AddWaterRightBtn/AddWaterRightBtn';
import { deleteWater, updateWater } from '../../redux/water/operations';
import { useTranslation } from 'react-i18next';
import ChooseDate from '../ChooseDate/ChooseDate';

export default function DailyStats() {
  const { t } = useTranslation();
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
      console.error(t('Failed to delete item:'), error);
    }
  };

  const handleSave = ({ id, updatedWater }) => {
    dispatch(updateWater({ id, updatedWater }));
    closeModal();
  };

  return (
    <div className={css.dailyStats}>
      <div className={css.header}>
        <ChooseDate />
        <AddWaterRightBtn />
      </div>
      <WaterList />
    </div>
  );
}
