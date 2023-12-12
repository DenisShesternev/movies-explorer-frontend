import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { DURATION_SHORTS } from '../../utils/constants';

function SavedMovies({ moviesSaved, savedMoviesToggle }) {

  const localStorageSavedMovies = localStorage.getItem('savedMovies');
  const [movies, setMovies] = useState(moviesSaved);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [savedMoviesTumbler, setSavedMoviesTumbler] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');

  const localStorageSavedMoviesTumbler = localStorage.getItem('savedMoviesTumbler');
  const localStorageSavedMoviesShort = localStorage.getItem('savedMoviesShort');
  const localStorageSavedSearchMovies = localStorage.getItem('savedMoviesSearch');
  const localStorageMoviesInputSearch = localStorage.getItem('savedMoviesInputSearch');

  function handleGetMovies(inputSearch) {
    if (!inputSearch && localStorageSavedMoviesTumbler === 'false') {
      localStorage.setItem('savedMoviesInputSearch', inputSearch)
      setMoviesInputSearch(inputSearch)
      const data = JSON.parse(localStorageSavedMovies)
      setMovies(data);
    }
    if (!inputSearch && localStorageSavedMoviesTumbler === 'true') {
      localStorage.setItem('savedMoviesInputSearch', inputSearch)
      setMoviesInputSearch(inputSearch)
      const data = JSON.parse(localStorageSavedMoviesShort)
      setMovies(data);
    }
    else {
      localStorage.setItem('savedMoviesInputSearch', inputSearch)
      setMoviesInputSearch(inputSearch)
      setErrorText('');
      setPreloader(true);
      // const data = JSON.parse(localStorageSavedMovies);
      const filterData = moviesSaved.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      localStorage.setItem('savedMoviesSearch', JSON.stringify(filterData));
      const filterDataShort = filterData.filter(({ duration }) => duration <= DURATION_SHORTS);
      localStorage.setItem('savedMoviesShort', JSON.stringify(filterDataShort));
      try {
        if (localStorageSavedMoviesTumbler === 'true') {
          setMovies(filterDataShort);
          setSavedMoviesTumbler(true);
        } else {
          setMovies(filterData);
          setSavedMoviesTumbler(false);
        }
      } catch (err) {
        setErrorText(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );

        setMovies([]);
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('savedMoviesTumbler');
        localStorage.removeItem('savedMoviesShort');
        localStorage.removeItem('savedMoviesSearch');
        localStorage.removeItem('savedMoviesInputSearch');
      } finally {
        setPreloader(false);
      }
    }
  }

  function handleGetMoviesTumbler(tumbler) {
    if (tumbler) {
      const filterData = moviesSaved.filter(({ duration }) => duration <= DURATION_SHORTS);
      localStorage.setItem('savedMoviesShort', JSON.stringify(filterData));
      setMovies(filterData);
    }
    else if (!localStorageMoviesInputSearch && !tumbler) {
      const filterData = JSON.parse(localStorageSavedMovies);
      setMovies(filterData);
    } else if (localStorageMoviesInputSearch && !tumbler) {
      const filterData = JSON.parse(localStorageSavedSearchMovies);
      setMovies(filterData);
    }
    localStorage.setItem('savedMoviesTumbler', tumbler);
  }

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(moviesSaved));
    setMovies(moviesSaved);
    if (localStorageSavedMoviesTumbler === 'true') {
      handleGetMoviesTumbler(true)
    }
    if (localStorageMoviesInputSearch) {
      handleGetMovies(localStorageMoviesInputSearch)
    }

  }, [localStorageMoviesInputSearch, localStorageSavedMoviesTumbler, moviesSaved]);


  return (
    <div className="saved-movies">
      <SearchForm
        handleGetMovies={handleGetMovies}
        moviesTumbler={savedMoviesTumbler}
        moviesInputSearch={moviesInputSearch}
        handleGetMoviesTumbler={handleGetMoviesTumbler} />
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && (
        <MoviesCardList
          moviesRemains={[]}
          savedMoviesToggle={savedMoviesToggle}
          movies={movies}
          moviesSaved={moviesSaved} />
      )}
    </div>
  );
};

export default SavedMovies;