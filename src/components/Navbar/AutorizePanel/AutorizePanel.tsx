import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom';
import style from './AutorizePanel.module.css'

export const AutorizePanel: FunctionComponent = () => {

    return (
        <div className={style.container}>
            <NavLink to='signup'>Зарегестрироваться</NavLink>
            <span>{" / "}</span>
            <NavLink to='signin'>Войти</NavLink>
        </div>
    )
}