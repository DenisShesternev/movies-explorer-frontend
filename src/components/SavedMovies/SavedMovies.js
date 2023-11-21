import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import saveMovies from '../../utils/saveMovies';

const SavedMovies = () => {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList
        cards={saveMovies}
        buttonMore={false} />
    </div>
  );
};

export default SavedMovies;