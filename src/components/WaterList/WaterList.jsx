import React from 'react';
import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';

export default function WaterList({}) {
  return (
    <div className={css.list_container}>
      <WaterItem />
    </div>
  );
}
