import { FunctionComponent } from 'react'
import style from './DropMenu.module.css'
import { Logo } from '../../Logo/Logo';
import { listRouteNavbar } from '../../../App';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooksStore';
import { signOut } from '../../../store/slices/authSlice';


type Props = {
    setDropMenu: (params: boolean) => void
}

export const DropMenu: FunctionComponent<Props> = ({ setDropMenu }) => {

    const onclick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setDropMenu(false)
    }

    const dispatch = useAppDispatch()
    const auth = useAppSelector(state => state.authSt.authorized)
    const setActiv = ({ isActive }: { isActive: boolean }) => isActive ? 'activLink1DropMenu' : ''

    const onexit = () => {
        dispatch(signOut())
    }

    return (
        <div className={style.wrapper}>
            <div className={style.head}>
                <Logo logo={'footer'} />
                <div onClick={(e) => onclick(e)} >
                    <img src="/img/gallery/exit.png" alt="выход" />
                </div>
            </div>
            <div className={style.liseRoute}>
                {listRouteNavbar.map((route) => {
                    return (<div key={route.name}><NavLink onClick={(e) => setDropMenu(false)} className={setActiv} to={route.href}>{route.name}</NavLink></div>)

                })}
            </div>
            {!auth ?
                <div className={style.ftr}>
                    <NavLink onClick={(e) => setDropMenu(false)} to={'signup'} style={{ color: '    var(--color-secondary)' }}>Зарегистрироваться</NavLink>
                    <NavLink className={style.ftrSecond} style={{ width: '80%', display: 'flex', justifyContent: 'center', flex: '1 1' }} to={'signin'}>
                        <button className={style.btn} onClick={(e) => setDropMenu(false)} >Войти
                        </button>
                    </NavLink>
                </div>
                :
                <NavLink style={{ width: '80%', display: 'flex', justifyContent: 'center', flex: '1 1' }} to={'/'}>
                    <button className={style.btn} onClick={onexit} >Выйти
                    </button>
                </NavLink>
            }
        </div>
    )
}