import './Form.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Form({ onSubmit, isValid, title, children, submit, question, path, link, message, isLoading }) {
    return (
        <section className="form">
            <div className="form__container">
                <Link to="/" className="form__link">
                    <img
                        className="form__logo"
                        src={logo}
                        alt="Логотип Movies Explorer">
                    </img>
                </Link>
                <h2 className="form__title">
                    {title}
                </h2>
                <form className="form__inputs" onSubmit={onSubmit}>
                    <div className="form__items">
                        {children}
                    </div>
                    <p className="form__text-error">
                        {message}
                    </p>
                    <button className={`form__button ${isValid ? "" : "form__button_disabled"}`} type="submit" disabled={!isValid || isLoading}>
                        {submit}
                    </button>
                </form>
                <p className="form__text">
                    {question}
                    <Link to={path} className="form__link">
                        {link}
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default Form;