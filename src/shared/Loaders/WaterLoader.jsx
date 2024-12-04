import css from './WaterLoader.module.css';

export default function WaterLoader() {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.water}></div>
    </div>
  );
}
