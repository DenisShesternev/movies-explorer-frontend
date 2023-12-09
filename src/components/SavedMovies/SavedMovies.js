import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi.js';
import { DURATION_SHORTS } from '../../utils/constants';

const SavedMovies = () => {
  const [movies, setMovies] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [savedMoviesTumbler, setSavedMoviesTumbler] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');

  const localStorageSavedMoviesTumbler = localStorage.getItem('savedMoviesTumbler');
  const localStorageSavedMovies = localStorage.getItem('savedMovies');
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
      const data = JSON.parse(localStorageSavedMovies);
      const filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
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

  async function savedMoviesToggle(movie) {
    try {
      await mainApi.deleteMovies(movie._id);
      const newMovies = await mainApi.getMovies();

      const filterData = newMovies.filter(({ duration }) => duration <= DURATION_SHORTS);
      localStorage.setItem('savedMoviesShort', JSON.stringify(filterData));
      localStorage.setItem('savedMovies', JSON.stringify(newMovies));

      if (localStorageSavedMoviesTumbler === 'true') {
        setMovies(filterData);
        setMoviesInputSearch('')
      }
      else {
        setMovies(newMovies);
        setMoviesInputSearch('')
      }
    } catch (err) {
      console.log('Во время удаления фильма произошла ошибка.');
    }
  }

  function handleGetMoviesTumbler(tumbler) {
    if (tumbler) {
      const filterData = movies.filter(({ duration }) => duration <= DURATION_SHORTS);
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
    mainApi.getMovies()
      .then((data) => {
        setMovies(data);
        localStorage.setItem('savedMovies', JSON.stringify(data));
        console.log('почему руботаем тут?')
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });

  }, []);


  return (
    <div className="saved-movies">
      <SearchForm handleGetMovies={handleGetMovies} moviesTumbler={savedMoviesTumbler} moviesInputSearch={moviesInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler} />
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && (
        <MoviesCardList moviesRemains={[]} savedMoviesToggle={savedMoviesToggle} movies={movies} />
      )}
    </div>
  );
};

export default SavedMovies;