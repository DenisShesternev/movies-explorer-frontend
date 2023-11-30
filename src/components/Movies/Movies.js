import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [moviesSaved, setMoviesSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [MoviesCount, setMoviesCount] = useState([]);
  const [moviesShowed, setMoviesShowed] = useState(null);
  const [moviesWithTumbler, setMoviesWithTumbler] = useState([]);
  const [moviesShowedWithTumbler, setMoviesShowedWithTumbler] = useState([]);

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      '1200': [12, 4],
      '900': [9, 3],
      '768': [8, 2],
      '240': [5, 2],
    };

    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key];
        }
      });

    return countCards;
  }

  function handleMore() {
    const spliceMovies = movies;
    const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, MoviesCount[1]));
    setMoviesShowed(newMoviesShowed);
    setMovies(spliceMovies);
  }

  async function handleGetMovies(inputSearch) {
    setMoviesTumbler(false);
    localStorage.setItem('moviesTumbler', false);

    if (!inputSearch) {
      setErrorText('Нужно ввести ключевое слово');
      return false;
    }

    setErrorText('');
    setPreloader(true);

    try {
      const data = await moviesApi.getMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      localStorage.setItem('movies', JSON.stringify(filterData));
      localStorage.setItem('moviesInputSearch', inputSearch);

      const spliceData = filterData.splice(0, MoviesCount[0]);
      setMoviesShowed(spliceData);
      setMovies(filterData);
      setMoviesShowedWithTumbler(spliceData);
      setMoviesWithTumbler(filterData);
    } catch (err) {
      setErrorText(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('movies');
      localStorage.removeItem('moviesTumbler');
      localStorage.removeItem('moviesInputSearch');
    } finally {
      setPreloader(false);
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

    localStorage.setItem('movies', JSON.stringify(filterDataShowed.concat(filterData)));
    localStorage.setItem('moviesTumbler', tumbler);
    setMoviesShowed(filterDataShowed);
    setMovies(filterData);
  }

  async function savedMoviesToggle(movie, favorite) {
    if (favorite) {
      const objMovie = {
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };
      try {
        await mainApi.addMovies(objMovie);
        const newSaved = await mainApi.getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        console.log('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await mainApi.deleteMovies(movie._id);
        const newSaved = await mainApi.getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        console.log('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    mainApi.getMovies()
      .then((data) => {
        setMoviesSaved(data);
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });

    const localStorageMovies = localStorage.getItem('movies');

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies);
      setMoviesShowed(filterData.splice(0, getMoviesCount()[0]));
      setMovies(filterData);
      setPreloader(false);
    }

    const localStorageMoviesTumbler = localStorage.getItem('moviesTumbler');
    const localStorageMoviesInputSearch = localStorage.getItem('moviesInputSearch');

    if (localStorageMoviesTumbler) {
      setMoviesTumbler(localStorageMoviesTumbler === 'true');
    }

    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch);
    }
  }, []);

  return (
    <div className="movies">
      <SearchForm handleGetMovies={handleGetMovies} moviesTumbler={moviesTumbler} moviesInputSearch={moviesInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler} />
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && moviesSaved !== null && moviesShowed !== null && (
        <MoviesCardList handleMore={handleMore} moviesRemains={movies} movies={moviesShowed} savedMoviesToggle={savedMoviesToggle} moviesSaved={moviesSaved} />
      )}
    </div>
  );
};

export default Movies;