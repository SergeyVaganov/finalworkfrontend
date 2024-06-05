import { FunctionComponent } from 'react'
import style from './Section3.module.css'

export const Section3: FunctionComponent = () => {
    return (
        <section className={style.img}>
            <object type="image/svg+xml" data="img/gallery/imgSecond.svg">
            </object>
        </section>
    )
}