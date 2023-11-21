import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/movies';

function Movies() {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList
        cards={movies}
        buttonMore={true} />
    </div>
  );
}

export default Movies;