import { FunctionComponent } from 'react'
import { SignInForm } from '../../components/SignInForm/SignInForm';
import style from './SignInPage.module.css'


export const SignInPage: FunctionComponent = () => {

    return (
        <div className={style.wrapper}>
            <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
            <div className={style.img}>
                <object type="image/svg+xml" data="img/gallery/authImage.svg"></object>
            </div>
            <div className={style.form}>
                <SignInForm />
            </div>
        </div>
    )
}