import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ movies, savedMoviesToggle, moviesSaved, moviesRemains, handleMore }) => {
  const { pathname } = useLocation();

  return (
    <section className="cards">
      {movies.length > 0 ? (
        <ul className="cards__list">
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              savedMoviesToggle={savedMoviesToggle}
              moviesSaved={moviesSaved}
            />
          ))}
        </ul>
      ) : (
        <div className="cards__text-error">Ничего не найдено</div>
      )}

      {moviesRemains.length > 0 && pathname !== '/saved-movies' && (
        <div className="cards__button-container">
          <button className="cards__button" type="button" name="more" onClick={handleMore}>Ещё</button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;