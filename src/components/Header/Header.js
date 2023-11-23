import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import Navigation from '../Navigation/Navigation';

const Header = ({ loggedIn }) => {
  return (
    <header className={`header ${!loggedIn ? 'header__auth' : ''}`}>
      < Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип Movies Explorer"></img>
      </Link>
      {!loggedIn && <NavigationAuth />}
      {loggedIn && <Navigation />}
    </header>
  );
};

export default Header;