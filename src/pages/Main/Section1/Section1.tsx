import { FunctionComponent } from 'react'
import { useAppSelector } from '../../../hooks/hooksStore';
import style from './Section1.module.css'
import { useNavigate } from 'react-router-dom';


export const Section1: FunctionComponent = () => {

    const authorized = useAppSelector((state) => state.authSt.authorized)
    const navigate = useNavigate()
    const onclick = () => {
        navigate('/request')
    }

    return (
        <section className={style.section}>
            <div className={style.item1}>
                <h1>СЕРВИС ПО ПОИСКУ <br />ПУБЛИКАЦИЙ <br />О КОМПАНИИ <br />ПО ЕГО ИНН</h1>
                <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                {
                    <button disabled={!authorized} onClick={onclick}>
                        {authorized ? 'Запросить данные' : 'Необходима регистрация'}
                    </button>
                }
            </div>
            <div className={style.item2}>
                <object type="image/svg+xml" data="img/gallery/main.svg"> </object>
            </div>
        </section>
    )
}