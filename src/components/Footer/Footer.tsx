import { FunctionComponent } from 'react'
import style from './Footer.module.css'
import { Logo } from '../Logo/Logo'

export const Footer: FunctionComponent = () => {

    return (
        <footer className={style.footer}>
            <div className={style.logo}>
                <Logo logo={'footer'} />
            </div>
            <div className={style.adress}>
                <div>
                    <div>г. Москва, Цветной б-р, 40</div>
                    <div>+7 495 771 21 11</div>
                    <div>info@skan.ru</div>
                </div>
                <div>Copyright. 2022</div>
            </div>
        </footer>
    )
}