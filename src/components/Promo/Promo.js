import './Promo.css';
import React from 'react';
import promoLogo from '../../images/promo__logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__logo" src={promoLogo} alt="Логотип" />
      </div>
    </section>
  );
}

export default Promo;