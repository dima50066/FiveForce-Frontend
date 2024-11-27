// photo mobile
import Customers1Mob from '../../shared/Images/Customers/customers1-mobile.png';
import Customers1Mob_2x from '../../shared/Images/Customers/customers1-mobile-2x.png';
import Customers2Mob from '../../shared/Images/Customers/customers2-mobile.png';
import Customers2Mob_2x from '../../shared/Images/Customers/customers2-mobile-2x.png';
import Customers3Mob from '../../shared/Images/Customers/customers3-mobile.png';
import Customers3Mob_2x from '../../shared/Images/Customers/customers3-mobile-2x.png';

// photo tablet, desctop
import Customers1 from '../../shared/Images/Customers/customers1-tabl-desc.png';
import Customers1_2x from '../../shared/Images/Customers/customers1-tabl-desc-2x.png';
import Customers2 from '../../shared/Images/Customers/customers2-tabl-desc.png';
import Customers2_2x from '../../shared/Images/Customers/customers2-tabl-desc-2x.png';
import Customers3 from '../../shared/Images/Customers/customers3-tabl-desc.png';
import Customers3_2x from '../../shared/Images/Customers/customers3-tabl-desc-2x.png';

// import { useEffect, useState } from 'react';
import css from './AdvantagesSection.module.css';

// const [usersAmount, setUsersAmount] = useState('');
// useEffect(() => {
//   getUsers().then(response => {
//     setUsersAmount(response.length);
//   });
// }, []);

const AdvantagesSection = () => {
  return (
    <section className={css.advantagesSectionWrapp}>
      <div className={css.advantagesCustomers}>
        <ul className={css.advantagesCustomersList}>
          <li>
            <picture>
              <source
                srcSet={`${Customers1Mob_2x} 2x, ${Customers1Mob} 1x`}
                media="(max-width: 767px)"
              />
              <source
                srcSet={`${Customers1_2x} 2x, ${Customers1} 1x`}
                media="(min-width: 768px)"
              />
              <img src={Customers1} alt="Customer avatar" />
            </picture>
          </li>

          <li>
            <picture>
              <source
                srcSet={`${Customers2Mob_2x} 2x, ${Customers2Mob} 1x`}
                media="(max-width: 767px)"
              />
              <source
                srcSet={`${Customers2_2x} 2x, ${Customers2} 1x`}
                media="(min-width: 768px)"
              />
              <img src={Customers2} alt="Customer avatar" />
            </picture>
          </li>

          <li>
            <picture>
              <source
                srcSet={`${Customers3Mob_2x} 2x, ${Customers3Mob} 1x`}
                media="(max-width: 767px)"
              />
              <source
                srcSet={`${Customers3_2x} 2x, ${Customers3} 1x`}
                media="(min-width: 768px)"
              />
              <img src={Customers3} alt="Customer avatar" />
            </picture>
          </li>
        </ul>

        <p className={css.advantagesCustomersText}>
          Our <span> happy </span> customers
        </p>
      </div>

      <div className={css.advantagesSectionBenefits}>
        <span className={css.advantagesSectionHabit}>
          <Icon className={css.iconCircle} id="circle" width={8} height={8} />
          Habit drive
        </span>
        <p className={css.advantagesSectionView}>View statistics</p>
        <p className={css.advantagesSectionPersonal}>Personal rate setting</p>
      </div>
    </section>
  );
};

export default AdvantagesSection;
