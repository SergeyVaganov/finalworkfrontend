import { FunctionComponent } from 'react'
import { CaruselCard } from '../../../components/Carusel/CaruselCard/CaruselCard'
import style from './Section2.module.css'
import { Carusel } from '../../../components/Carusel/Carusel'


export const Section2: FunctionComponent = () => {
    const listSlide = [
        { id: 1, icon: '/img/slider/icon1.svg', text: 'Высокая и оперативная скорость обработки заявки' },
        { id: 2, icon: '/img/slider/icon2.svg', text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос' },
        { id: 3, icon: '/img/slider/icon3.svg', text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству' }
    ]

    return (
        <section className={style.main}>
            <h1>ПОЧЕМУ ИМЕННО МЫ</h1>
            <Carusel>
                <CaruselCard key={listSlide[0].id} {...listSlide[0]} />
                <CaruselCard key={listSlide[1].id} {...listSlide[1]} />
                <CaruselCard key={listSlide[2].id} {...listSlide[2]} />

            </Carusel>
        </section>
    )
}



