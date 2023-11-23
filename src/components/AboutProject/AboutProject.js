import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__info">
          <h3 className="about-project__info-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info">
          <h3 className="about-project__info-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__container">
        <div className="about-project__time">
          <h4 className="about-project__time-title">1 неделя</h4>
          <p className="about-project__time-text">Back-end</p>
        </div>
        <div className="about-project__time">
          <h4 className="about-project__time-title about-project__time-title_type_light">4 недели</h4>
          <p className="about-project__time-text">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;