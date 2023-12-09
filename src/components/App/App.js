import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainApi from '../../utils/MainApi';
import Token from '../../utils/token';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function checkToken() {
        const jwt = localStorage.getItem('jwt')
        if (jwt) {
            MainApi.getToken(jwt).then((res) => {
                if (res) {
                    setLoggedIn(true)
                    navigate(pathname)
                }
            }).catch((err) => console.log(err)
            )
        }
        else {
            onSignOut()
        }
    };

    function getUserInfo() {
        MainApi.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
                setLoggedIn(true);
            })
            .catch((err) => {
                console.log(`Что-то пошло не так! ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function onRegister(formData) {
        MainApi.registerUser(formData)
            .then((res) => {
                if (res._id) {
                    onLogin(formData);
                }
            })
            .catch((res) => {
                if (res === 'Ошибка: 409') {
                    setMessage('Пользователь с таким email уже существует.');
                }
                else if (res !== 'Ошибка: 409') {
                    setMessage('Что-то пошло не так! Ошибка регистрации.');
                }
            })
    }
    function onLogin(formData) {
        MainApi.loginUser(formData)
            .then(({ token }) => {
                if (token) {
                    Token.saveToken(token);
                    MainApi.updateToken();
                    setLoggedIn(true);
                    getUserInfo();
                    navigate.push('/movies');
                }
            })
            .catch((res) => {
                if (res === 'Ошибка: 401') {
                    setMessage('Неправильная почта или пароль.');
                }
                else if (res !== 'Ошибка: 401') {
                    setMessage('Что-то пошло не так! Ошибка авторизации.');
                }
            })
    }

    function onSignOut() {
        Token.removeToken();
        setLoggedIn(false);
        localStorage.removeItem('movies');
        localStorage.removeItem('moviesShort');
        localStorage.removeItem('moviesTumbler');
        localStorage.removeItem('moviesInputSearch');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('savedMoviesTumbler');
        localStorage.removeItem('savedMoviesShort');
        localStorage.removeItem('savedMoviesSearch');
        localStorage.removeItem('savedMoviesInputSearch');
    }

    useEffect(() => {
        checkToken()
    }, [])

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        if (pathname === '/signin' || '/signup') {
            setMessage('');
        }
    }, [pathname]);


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ?
                    <Header loggedIn={loggedIn} isLoading={isLoading} /> : ''}
                <Routes>
                    <Route exact path="/" element={
                        <>
                            <Main />
                        </>
                    } />
                    <Route exact path="/movies" element={
                        <ProtectedRoute
                            loggedIn={loggedIn}
                            component={Movies}
                            isLoading={isLoading}
                        />

                    } />
                    <Route exact path="/saved-movies" element={
                        <ProtectedRoute
                            loggedIn={loggedIn}
                            component={SavedMovies}
                            isLoading={isLoading}
                        />
                    } />
                    <Route exact path="/profile" element={
                        <>
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                component={Profile}
                                isLoading={isLoading}
                                onSignOut={onSignOut}
                            />
                        </>
                    } />
                    <Route exact path="/signup" element={
                        !loggedIn ? (
                            <Register
                                onRegister={onRegister}
                                message={message} />
                        ) : (
                            <Navigate to="/movies" />
                        )
                    } />
                    <Route exact path="/signin" element={
                        !loggedIn ? (
                            <Login
                                onLogin={onLogin}
                                message={message} />
                        ) : (
                            <Navigate to="/movies" />
                        )
                    } />
                    <Route path="*" element={
                        <>
                            <PageNotFound />
                        </>
                    } />
                </Routes>
                {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
