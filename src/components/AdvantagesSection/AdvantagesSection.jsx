import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './AdvantagesSection.module.css';
import Icon from '../../shared/Icons/Icon';
import { fetchUsersCount } from '../../redux/user/operations';
import { selectUsersCount } from '../../redux/user/selectors';
import Customers1Mob from '../../shared/Images/Customers/customers1-mobile.png';
import Customers1Mob_2x from '../../shared/Images/Customers/customers1-mobile-2x.png';
import Customers2Mob from '../../shared/Images/Customers/customers2-mobile.png';
import Customers2Mob_2x from '../../shared/Images/Customers/customers2-mobile-2x.png';
import Customers3Mob from '../../shared/Images/Customers/customers3-mobile.png';
import Customers3Mob_2x from '../../shared/Images/Customers/customers3-mobile-2x.png';
import Customers1 from '../../shared/Images/Customers/customers1-tabl-desc.png';
import Customers1_2x from '../../shared/Images/Customers/customers1-tabl-desc-2x.png';
import Customers2 from '../../shared/Images/Customers/customers2-tabl-desc.png';
import Customers2_2x from '../../shared/Images/Customers/customers2-tabl-desc-2x.png';
import Customers3 from '../../shared/Images/Customers/customers3-tabl-desc.png';
import Customers3_2x from '../../shared/Images/Customers/customers3-tabl-desc-2x.png';
import { useTranslation } from 'react-i18next';

const AdvantagesSection = () => {
  const { t, i18n } = useTranslation();
  const isUk = i18n.language === 'uk'; // Перевірка обраної мови
  const dispatch = useDispatch();
  const usersCount = useSelector(selectUsersCount);
  const isLoading = useSelector(state => state.users?.isLoading);

  useEffect(() => {
    dispatch(fetchUsersCount());
  }, [dispatch]);

  return (
    <section
      className={`${css.advantagesSectionWrapp} ${
        isUk ? css.advantagesSectionWrappUk : ''
      }`}
    >
      <div
        className={`${css.advantagesCustomers} ${
          isUk ? css.advantagesCustomersUk : ''
        }`}
      >
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
              <img src={Customers1} alt="Customers1" />
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
              <img src={Customers2} alt="Customers2" />
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
              <img src={Customers3} alt="Customers3" />
            </picture>
          </li>
        </ul>

        <p
          className={`${css.advantagesCustomersText} ${
            isUk ? css.advantagesCustomersTextUk : ''
          }`}
        >
          {isLoading || usersCount === 0
            ? t('Our happy customers')
            : t('{{count}} happy customers', { count: usersCount })}
        </p>
      </div>

      <div
        className={`${css.advantagesSectionBenefits} ${
          isUk ? css.advantagesSectionBenefitsUk : ''
        }`}
      >
        <span className={css.advantagesSectionHabit}>
          <Icon className={css.iconCircle} id="circle" width={8} height={8} />
          {t('Habit drive')}
        </span>
        <p className={css.advantagesSectionView}>{t('View statistics')}</p>
        <p className={css.advantagesSectionPersonal}>
          {t('Personal rate setting')}
        </p>
      </div>
    </section>
  );
};

export default AdvantagesSection;
