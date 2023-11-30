import './MoviesCard.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie, savedMoviesToggle, moviesSaved }) => {
  const { pathname } = useLocation();
  const [favorite, setFavorite] = useState(false);

  function handleFavoriteToogle() {
    const newFavorite = !favorite;
    const savedMovie = moviesSaved.filter((obj) => {
      return obj.movieId === movie.id;
    });
    savedMoviesToggle({ ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null }, newFavorite);
  }

  function handleFavoriteDelete() {
    savedMoviesToggle(movie, false);
  }

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedMovie = moviesSaved.filter((obj) => {
        return obj.movieId === movie.id;
      });

      if (savedMovie.length > 0) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [pathname, moviesSaved, movie.id]);

  return (
    <li className="card">
      <a className="card__image-trailer" href={pathname === '/saved-movies' ? movie.trailer : movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU}></img>
      </a>
      <div className="card__element">
        <p className="card__title">{movie.nameRU}</p>
        <div className="card__buttons">
          {pathname === '/saved-movies' ? (
            <button type="button" className="card__button card__button_delete" onClick={handleFavoriteDelete} />
          ) : (
            <button type="button" className={`card__button card__button${favorite ? '_active' : '_inactive'}`} onClick={handleFavoriteToogle}
            > {favorite? '' : <h3 className='card__save'>Сохранить</h3> }
            </button>
          )}

        </div>
        <p className="card__duration">{getMovieDuration(movie.duration)}</p>
      </div>
    </li>
  );
};

export default MoviesCard;