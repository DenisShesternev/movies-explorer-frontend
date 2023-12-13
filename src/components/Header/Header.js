import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import Navigation from '../Navigation/Navigation';

const Header = ({ loggedIn, isLoading }) => {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== '/' ? '' : 'header__auth'}`}>
      < Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип Movies Explorer"></img>
      </Link>
      {isLoading ? '' : loggedIn ? <Navigation /> : <NavigationAuth />}
    </header>
  );
};

export default Header;