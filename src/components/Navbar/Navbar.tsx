import { FunctionComponent, useEffect, useState } from 'react'
import { Logo } from '../../components/Logo/Logo'
import { Listitems } from './Listitems/Listitems'
import { LimitPanel } from './LimitPanel/LimitPanel'
import { useAppSelector, useAppDispatch } from '../../hooks/hooksStore';
import { AvatarPanel } from './AvatarPanel/AvatarPanel'
import { AutorizePanel } from './AutorizePanel/AutorizePanel';
import style from './Navbar.module.css'
import { authorizedOff } from '../../store/slices/authSlice';
import Loader from 'react-ts-loaders';
import { createPortal } from 'react-dom'
import { DropMenu } from './DropMenu/DropMenu';

export const Navbar: FunctionComponent = () => {

    const auth = useAppSelector((state) => state.authSt)
    const dispatch = useAppDispatch()
    const [dropMenu, setDropMenu] = useState<boolean>(false)

    useEffect(() => {
        if ((auth.expire) && (new Date(auth.expire).getTime()) < Date.now()) {
            dispatch(authorizedOff())
        }
    }, [])

    const onDropMenu = () => {
        console.log('drop')
        setDropMenu(true)
    }

    return (
        <nav className={style.nav}>
            <div className={style.logo}>
                <Logo logo={'header'} />
            </div>
            <div className={style.block}>
                <Listitems />
                {auth.loading ?
                    <Loader type="dotspinner" color="#888888" size={60} />
                    :
                    auth.authorized ?
                        <>
                            <div className={style.limitpanel}>
                                <LimitPanel />
                            </div>
                            <div className={style.avatarpanel}>
                                <AvatarPanel />
                            </div>
                        </>
                        :
                        <AutorizePanel />
                }

                <div className={style.dropmenu} onClick={onDropMenu}>
                    <img src="img/gallery/menu.svg" alt='menu' />
                </div>

            </div>
            {dropMenu ?
                createPortal(
                    <DropMenu setDropMenu={setDropMenu}/>,
                    document.body
                ) :
                <></>

            }
        </nav >
    )
}