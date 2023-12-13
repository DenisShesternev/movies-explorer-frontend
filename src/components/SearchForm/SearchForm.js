import './SearchForm.css';
import { useEffect, useState } from 'react';

const SearchForm = ({ handleGetMovies, moviesTumbler, moviesInputSearch, handleGetMoviesTumbler }) => {
  const [inputSearch, setInputSearch] = useState('');
  const [tumbler, setTumbler] = useState(false);

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleTumblerChange(evt) {
    const newTumbler = !tumbler;
    setTumbler(newTumbler);
    handleGetMoviesTumbler(newTumbler);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleGetMovies(inputSearch);
  }

  useEffect(() => {
    setTumbler(moviesTumbler);
    setInputSearch(moviesInputSearch);
  }, [moviesTumbler, moviesInputSearch]);

  return (
    <form className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" value={inputSearch || ''} onChange={handleInputChange} required />
        <button type="submit" className="search__button" onClick={handleSubmit}>Найти</button>
        <div className='search__line'></div>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input type="checkbox" className="search__checkbox" value={tumbler} checked={tumbler} onChange={handleTumblerChange} />
            <span className="search__slider" />
          </label>
          <p className="search__movies">Короткометражки</p>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;