import { FunctionComponent } from 'react'
import style from './RequestDataPage.module.css'
import { RequestForm } from '../../components/RequestForm/RequestForm'


export const RequestDataPage: FunctionComponent = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.title}>
                <h1>Найдите необходимые данные в пару кликов.</h1>
                <div>Задайте параметры поиска.
                    Чем больше заполните, тем точнее поиск</div>
                <img src="/img/gallery/document.png" alt="img" />
            </div>
            <div className={style.form}>
                <RequestForm />
            </div>
            <div className={style.img}>
                <img src="/img/gallery/folders.png" alt="" />
            </div>
            <div className={style.mainimg}>
                <object type="image/svg+xml" data="/img/gallery/requestImage.svg"></object>
            </div>
        </div>
    )
}