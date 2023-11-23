import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies'; 
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={
                    <>
                        <Header loggedIn={false} />
                        <Main />
                        <Footer />
                    </>
                } />
                <Route path="/movies" element={
                    <>
                        <Header loggedIn={true} />
                        <Movies />
                        <Footer />
                    </>
                } />
                <Route exact path="/saved-movies" element={
                    <>
                        <Header loggedIn={true} />
                        <SavedMovies />
                        <Footer />
                    </>
                } />
                <Route exact path="/profile" element={
                    <>
                        <Header loggedIn={true} />
                        <Profile />
                    </>
                } />
                <Route exact path="/signup" element={
                    <>
                        <Register />
                    </>
                } />
                <Route exact path="/signin" element={
                    <>
                        <Login />
                    </>
                } />
                <Route path="*" element={
                    <>
                        <PageNotFound />
                    </>
                } />
            </Routes>
        </div>
    );
}

export default App;
