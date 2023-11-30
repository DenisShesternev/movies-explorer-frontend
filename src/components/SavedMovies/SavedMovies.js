import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi.js';

const SavedMovies = () => {
  const [movies, setMovies] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [moviesWithTumbler, setMoviesWithTumbler] = useState([]);
  const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([]);

  async function handleGetMovies(inputSearch, tumbler) {
    setErrorText('');
    setPreloader(true);

    try {
      const data = movies;
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      setMoviesShowed(filterData);

      if (inputSearch) {
        localStorage.setItem('savedMovies', JSON.stringify(filterData));
        localStorage.setItem('savedMoviesTumbler', tumbler);
        localStorage.setItem('savedMoviesInputSearch', inputSearch);
      } else {
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('savedMoviesTumbler');
        localStorage.removeItem('savedMoviesInputSearch');
      }
    } catch (err) {
      setErrorText(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('savedMovies');
      localStorage.removeItem('savedMoviesTumbler');
      localStorage.removeItem('savedMoviesInputSearch');
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(movie, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovies(movie._id);
        const newMovies = await mainApi.getMovies();
        setMoviesShowed(newMovies);
        setMovies(newMovies);
      } catch (err) {
        console.log('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];

    if (tumbler) {
      setMoviesShowedWithTumbler(moviesShowed);
      setMoviesWithTumbler(movies);
      filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40);
      filterData = movies.filter(({ duration }) => duration <= 40);
    } else {
      filterDataShowed = moviesShowedWithTumbler;
      filterData = moviesWithTumbler;
    }
    setMoviesShowed(filterDataShowed);
    setMovies(filterData);
  }

  
 async function savedMoviesLocal() {
  const localStorageMovies = localStorage.getItem('savedMovies');
  if (localStorageMovies) {
    setMovies(JSON.parse(localStorageMovies));
    const localStorageMoviesTumbler = localStorage.getItem('savedMoviesTumbler');
    const localStorageMoviesInputSearch = localStorage.getItem('savedMoviesInputSearch');

    if (localStorageMoviesTumbler) {
      setMoviesTumbler(localStorageMoviesTumbler === 'true');
    }
    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch);
    }
  } else {
    try {
      const data = await mainApi.getMovies();
      setMovies(data);
      setMoviesShowed(data);
    } catch (err) {
      console.log(`Ошибка сервера ${err}`);
    }
  }
  };

  useEffect(() => {
savedMoviesLocal()
  }, []);


  return (
    <div className="saved-movies">
      <SearchForm handleGetMovies={handleGetMovies} moviesTumbler={moviesTumbler} moviesInputSearch={moviesInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler}/>
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && (
        <MoviesCardList moviesRemains={[]} savedMoviesToggle={savedMoviesToggle} movies={moviesShowed} />
      )}
    </div>
  );
};

export default SavedMovies;