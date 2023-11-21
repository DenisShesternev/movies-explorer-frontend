import './NavTab.css';
import React from 'react';

function NavTab() {
  return (
    <section className="navtab">
      <div className="navtab__container">
        <a className='navtab__link' href='#about-project'>О проекте</a>
        <a className='navtab__link' href='#techs'>Технологии</a>
        <a className='navtab__link' href='#about-me'>Студент</a>
      </div>
    </section>
  );
}

export default NavTab;