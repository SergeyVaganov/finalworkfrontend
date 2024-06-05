import { FunctionComponent } from 'react'
import { useAppSelector, useAppDispatch } from '../../../hooks/hooksStore'
import { signOut } from '../../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import style from './AvatarPanel.module.css'


export const AvatarPanel: FunctionComponent = () => {

    const navigator = useNavigate()
    const dispatch = useAppDispatch()
    const login = useAppSelector((state) => state.authSt.login)

    const onclick = () => {
        dispatch(signOut())
        navigator("/", { replace: true })
    }

    return (
        <div className={style.container}>
            <div className={style.login}>{login}</div>
            <div className={style.out} onClick={onclick}>Выйти</div>
            <div className={style.avatar}>
                <img className={style.img} src="/img/avatar/unknow.jpg" alt="avatar" />
            </div>
        </div>
    )
}