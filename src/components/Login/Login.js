import Form from '../Form/Form';
import { useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';

function Login({ onLogin, message, isLoading }) {
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
    onLogin(inputValues);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      isValid={isValid}
      title="Рады видеть!"
      submit={isLoading? 'Вход...' : 'Войти'}
      message={message}
      question="Ещё не зарегистрированы?"
      link="Регистрация"
      path="/signup"
      isLoading={isLoading}
      >
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

export default Login;