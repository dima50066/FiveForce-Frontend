import css from './WaterProgressBar.module.css';

const WaterProgressBar = () => {
  return (
    <div className={css.progressBarWrapp}>
      <h4 className={css.progressBarText}>Today</h4>

      <div className={css.progressBar}>
        <div className={css.progressline}>
          <div className={css.progressIndicator}></div>
        </div>
      </div>

      <ul className={css.progressBarList}>
        <li>0%</li>
        <li>50%</li>
        <li>100%</li>
      </ul>
    </div>
  );
};

export default WaterProgressBar;
