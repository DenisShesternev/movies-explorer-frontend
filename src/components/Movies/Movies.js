import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';
import { DURATION_SHORTS } from '../../utils/constants';

const Movies = () => {
  const [moviesSaved, setMoviesSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [movies, setMovies] = useState(null);
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [moviesShowed, setMoviesShowed] = useState(null);

  const localStorageMovies = localStorage.getItem('movies');
  const localStorageMoviesShort = localStorage.getItem('moviesShort');
  const localStorageMoviesTumbler = localStorage.getItem('moviesTumbler');
  const localStorageMoviesInputSearch = localStorage.getItem('moviesInputSearch');

  const [MoviesCount, setMoviesCount] = useState([]);

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
      '800': [8, 2],
      '768': [8, 1],
      '0': [5, 1],
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
    const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, MoviesCount[0]));
    setMoviesShowed(newMoviesShowed);
    setMovies(spliceMovies);
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

  async function handleGetMovies(inputSearch) {
    if (!inputSearch) {
      setErrorText('Нужно ввести ключевое слово');
      return false;
    }

    setErrorText('');
    setPreloader(true);
    const data = await moviesApi.getMovies();
    const filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
    localStorage.setItem('movies', JSON.stringify(filterData));
    const filterDataShort = filterData.filter(({ duration }) => duration <= DURATION_SHORTS);
    localStorage.setItem('moviesShort', JSON.stringify(filterDataShort));
    localStorage.setItem('moviesInputSearch', inputSearch);
    try {
      if (localStorageMoviesTumbler === 'true') {
        const spliceData = filterDataShort.splice(0, MoviesCount[0]);
        setMoviesShowed(spliceData);
        setMovies(filterDataShort);
        setMoviesTumbler(true);
      } else {
        const spliceData = filterData.splice(0, MoviesCount[0]);
        setMoviesShowed(spliceData);
        setMovies(filterData);
        setMoviesTumbler(false);
      }
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

  function handleGetMoviesTumbler(tumbler) {
    if (tumbler) {
      const filterDataShowed = moviesShowed.filter(({ duration }) => duration <= DURATION_SHORTS);
      const filterData = movies.filter(({ duration }) => duration <= DURATION_SHORTS);
      localStorage.setItem('moviesShort', JSON.stringify(filterDataShowed.concat(filterData)));
      setMoviesShowed(filterDataShowed);
      setMovies(filterData);
    } else {
      const filterData = JSON.parse(localStorageMovies);
      setMoviesShowed(filterData.splice(0, MoviesCount[0]));
      setMovies(filterData);
    }
    localStorage.setItem('moviesTumbler', tumbler);

  }
  useEffect(() => {
    mainApi.getMovies()
      .then((data) => {
        setMoviesSaved(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      });

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies);
      setMoviesShowed(filterData.splice(0, MoviesCount[0]));
      setMovies(filterData);
      setPreloader(false);
    }

    if (localStorageMoviesTumbler === 'true') {
      setMoviesTumbler(localStorageMoviesTumbler === 'true');
      const filterData = JSON.parse(localStorageMoviesShort);
      setMoviesShowed(filterData);
      setMovies(filterData);
      setPreloader(false);
    }

    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch);
    }
  }, [MoviesCount, localStorageMovies, localStorageMoviesInputSearch, localStorageMoviesShort, localStorageMoviesTumbler]);

  return (
    <div className="movies">
      <SearchForm
        handleGetMovies={handleGetMovies}
        moviesTumbler={moviesTumbler}
        moviesInputSearch={moviesInputSearch}
        handleGetMoviesTumbler={handleGetMoviesTumbler} />
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!preloader && !errorText && movies !== null && moviesSaved !== null && moviesShowed !== null && (
        <MoviesCardList
          handleMore={handleMore}
          moviesRemains={movies}
          movies={moviesShowed}
          savedMoviesToggle={savedMoviesToggle}
          moviesSaved={moviesSaved} />
      )}
    </div>
  );
};

export default Movies;