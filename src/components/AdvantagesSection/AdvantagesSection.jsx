// import Customers1 from '../../shared/Images/Customers/customers1-mobile.png';
import Customers1 from '../../shared/Images/Customers/customers1-mobile-2x.png';
// import Customers2 from '../../shared/Images/Customers/customers2-mobile.png';
import Customers2 from '../../shared/Images/Customers/customers2-mobile-2x.png';
// import Customers3 from '../../shared/Images/Customers/customers3-mobile.png';
import Customers3 from '../../shared/Images/Customers/customers3-mobile-2x.png';

import css from './AdvantagesSection.module.css';

const AdvantagesSection = () => {
  return (
    <div className={css.advantagesSectionWrapp}>
      <div className={css.advantagesCustomers}>
        <ul className={css.advantagesCustomersList}>
          <li>
            <img
              src={Customers1}
              alt="Customers avatar"
              width="28"
              height="28"
            />
          </li>

          <li>
            <img
              src={Customers2}
              alt="Customers avatar"
              width="28"
              height="28"
            />
          </li>

          <li>
            <img
              src={Customers3}
              alt="Customers avatar"
              width="28"
              height="28"
            />
          </li>
        </ul>

        <p className={css.advantagesCustomersText}>
          Our <span>happy</span> customers
        </p>
      </div>

      <div className={css.advantagesSectionBenefits}>
        <p className={css.advantagesSectionHabit}>
          {/* <svg className={css.benefitsIcon} width="8" height="8">
            <use href="../../shared/Icons/elipce.svg#"></use>
          </svg> */}
          Habit drive
        </p>
        <p className={css.advantagesSectionView}>View statistics</p>
        <p className={css.advantagesSectionPersonal}>Personal rate setting</p>
      </div>
    </div>
  );
};

export default AdvantagesSection;
