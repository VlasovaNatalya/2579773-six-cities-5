import { Link } from 'react-router-dom';
import { OfferPreviewType } from '../../types/offer-preview';
import Logo from '../logo/logo';
import { AppRoute } from '../../const';
import CardFavorites from '../card-favorites/card-favorites';

type FavoritesPageProps = {
  offers: OfferPreviewType[];
}

function getFavorites(favorites:OfferPreviewType[]) {
  return favorites.reduce<{ [key: string]: OfferPreviewType[] }>((acc, curr) => {
    const city = curr.city.name;
    if(!(city in acc)) {
      acc[city] = [];
    }
    acc[city].push(curr);
    return acc;
  }, {});
}

const FavoritesPage = ({offers}: FavoritesPageProps): JSX.Element => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const favoritesByCity = getFavorites(favoriteOffers);
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCity).map(([city, cityOffers]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <CardFavorites key={offer.id} offer={offer} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
