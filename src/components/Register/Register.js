import Form from '../Form/Form';
import { useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';

function Register({ onRegister, message, isLoading }) {
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!isEmail(value)) {
        target.setCustomValidity('Некорректый адрес почты');
      } else {
        target.setCustomValidity('');
      }
    }

    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(inputValues);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      isValid={isValid}
      title="Добро пожаловать!"
      submit={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      message={message}
      question="Уже зарегистрированы?"
      link="Войти"
      path="/signin"
      isLoading={isLoading}
      >
      <label className="form__item">
        <p className="form__item-text">Имя</p>
        <input
          className="form__field"
          name="name"
          placeholder="Введите имя"
          value={inputValues.name || ''}
          onChange={handleInputChange}
          required />
        <p className="form__error">Что-то пошло не так...</p>
      </label>
      <label className="form__item">
        <p className="form__item-text">E-mail</p>
        <input
          className={`form__field ${errors.email ? 'form__field_color-error' : ''}`}
          name="email"
          type="email"
          placeholder="Введите почту"
          value={inputValues.email || ''}
          onChange={handleInputChange}
          required
        />
        <p className={`form__error ${errors.email ? 'form__error-display' : ''}`}>{errors.email}</p>
      </label>
      <label className="form__item">
        <p className="form__item-text">Пароль</p>
        <input
          className={`form__field ${errors.password ? 'form__field_color-error' : ''}`}
          name="password"
          type="password"
          minLength="8"
          placeholder="Введите пароль"
          value={inputValues.password || ''}
          onChange={handleInputChange}
          required
        />
        <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>
      </label>
    </Form>
  );
}

export default Register;