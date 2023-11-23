import './Navigation.css';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import profile from '../../images/profile-icon.svg';
import profile__home from '../../images/profile-icon__home.svg';

const Navigation = () => {
    const [showItems, setShowItems] = useState(false);
    const handleToggleMenu = () => setShowItems(!showItems);
    const { pathname } = useLocation();

    return (
        <nav className="navigation">
            <div className={`navigation__container ${showItems ? 'navigation__container_visible' : ''}`}>
                <div className="navigation__sidebar">
                    <div className="navigation__list-container">
                        <button className="navigation__btn-close" type="button" onClick={handleToggleMenu}></button>
                        <ul className="navigation__list">
                            <li className="navigation__list-item navigation__list-item_type_main">
                                <Link to="/" className="navigation__link">Главная</Link>
                            </li>
                            <li className="navigation__list-item">
                                <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
                            </li>
                            <li className="navigation__list-item">
                                <NavLink to="/saved-movies" className="navigation__link">Сохранённые фильмы</NavLink>
                            </li>
                        </ul>
                    </div>
                    <NavLink to="/profile" className="navigation__link navigation__link_type_profile">
                        <h3 className='navigation__profile'>Аккаунт</h3>
                        {pathname === '/' ? (
                            <img className='navigation__profile-icon navigation__profile-icon_home' src={profile__home} alt='Profile-Icon' />
                        ) : (
                            <img className='navigation__profile-icon' src={profile} alt='Profile-Icon' />
                        )}
                    </NavLink>
                </div>
            </div>
            <button className="navigation__btn-menu" type="button" onClick={handleToggleMenu}></button>
        </nav>
    );
};

export default Navigation;