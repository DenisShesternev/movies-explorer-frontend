import './AboutMe.css';
import avatar from '../../images/about-me__avatar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me" id='about-me'>
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Денис</h3>
          <p className="about-me__job">Фронтенд-разработчик, 24 года</p>
          <p className="about-me__description">
            Я родился г. Нижнеудинск и живу в г. Иркутск, закончил факультет электроэнергетики в ИрНИТУ. У меня есть жена и две кошки. Я люблю слушать музыку, а ещё увлекаюсь кроссфитом. Недавно начал кодить. С 2018 года работаю на себя в направлении архитектурного тонирования остекления. После того, как пройду курс по веб-разработке, хочу сменить профессию и постаратьcя найти первую работу в IT.
          </p>
          <ul className="about-me__links">
            <li><a className="about-me__link" href="https://github.com/DenisShesternev" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
        <img src={avatar} alt="about-me" className="about-me__image" />
      </div>
    </section>
  );
};

export default AboutMe;