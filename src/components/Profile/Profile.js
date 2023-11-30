import './Profile.css';
import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';

const Profile = ({ onSignOut, openPopup }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [lastEmail, setLastEmail] = useState(currentUser.email);
  const [isVisibleButton, setVisibleButton] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();

    mainApi.updateUserInfo({ name, email })
      .then(() => {
        setVisibleButton(false);
        setLastName(name);
        setLastEmail(email);
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

    if (value !== lastName) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);

    if (value !== lastEmail) {
      setVisibleButton(true);
    } else {
      setVisibleButton(false);
    }
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h3 className="profile__greeting">Привет, {name}!</h3>
        <div className="profile__inputs">
          <p className="profile__text">Имя</p>
          <div className="profile__area profile__area_type_name">
            <input className="profile__settings" value={name} onChange={handleNameChange} />
          </div>
          <div className="profile__area profile__area_type_email">
            <input className="profile__settings" value={email} onChange={handleEmailChange} />
          </div>
          <p className="profile__text">E-mail</p>
        </div>
        <p className="profile__text-error">
          {message}
        </p>
        <button className="profile__button" disabled={!isVisibleButton}>
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