import './Profile.css';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

const Profile = ({ onSignOut, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [helloName, setHelloName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
// Изменяем имя приветствия только после успешного ответа сервера
    mainApi.updateUserInfo({ name, email })
      .then(() => {
        setVisibleButton(false);
        setName(name)
        setEmail(email)
        setHelloName(name)
        setMessage('Данные успешно изменены.')
      })
      .catch(res => {
        if (res === 'Ошибка: 400') {
          setMessage('Переданы некоректные данные при редактировании профиля');
        }
        else if (res === 'Ошибка: 409') {
          setMessage('Пользователь с таким email уже существует.');
        }
      });
  }

  function handleNameChange(evt) {
    const value = evt.target.value;
    setName(value);
    if (value !== name) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);
    if (value !== email) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  useEffect(() => {
   setName(currentUser.name);
   setEmail(currentUser.email)
   setHelloName(currentUser.name)
  }, [currentUser]);

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__greeting">Привет, {helloName}!</h3>
        <div className="profile__inputs">
          <p className="profile__text">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input className="profile__settings" value={name} onChange={handleNameChange} />
          </div>
          <div className="profile__area profile__area_type_email">
            <input className="profile__settings" value={email} onChange={handleEmailChange} />
          </div>
          <p className="profile__text">E-mail</p>
          <p className="profile__text-error">
          {message}
        </p>
        </div>
        <button className="profile__button" disabled={!isVisibleButton || isLoading}>
          Редактировать
        </button>
        <button className="profile__link" type="button" onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;