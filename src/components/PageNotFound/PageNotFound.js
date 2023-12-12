import './PageNotFound.css'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='not-found'>
            <div className='not-found__container'>
                <h1 className="not-found__title">404</h1>
                <p className="not-found__text">Страница не найдена</p>
            </div>
            <p onClick={() => navigate(-1)} className="not-found__link">Назад</p>
        </div>
    )
}

export default PageNotFound;
