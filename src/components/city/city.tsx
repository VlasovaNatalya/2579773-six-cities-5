import { CityType } from '../../types/city';

type CityProps = {
  city: CityType;
  isActive: boolean;
  onClick: () => void;
}

const City = ({city, isActive, onClick}: CityProps): JSX.Element => (
  <li className="locations__item">
    <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#" onClick={() => onClick()}>
      <span>{city.name}</span>
    </a>
  </li>
);
export default City;
