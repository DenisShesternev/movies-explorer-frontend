import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search">
      <div className="search__container">
        <input className="search__input" placeholder="Фильм" type="text" required />
        <button type="submit" className="search__button">Найти</button>
        <div className='search__line'></div>
        <div className="search__toggle">
          <label className="search__tumbler">
            <input type="checkbox" className="search__checkbox" />
            <span className="search__slider" />
          </label>
          <p className="search__films">Короткометражки</p>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;