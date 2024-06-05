import { FunctionComponent } from 'react'
import { NavLink } from 'react-router-dom';
import style from './ListItems.module.css'
import { listRouteNavbar } from '../../../App';



export const Listitems: FunctionComponent = () => {

    const setActiv = ({ isActive }: { isActive: boolean }) => isActive ? 'activLink' : ''

    return (

        <ul className={`${'hidden750'} ${style.menuItems}`} >
            {listRouteNavbar.map((route) => {
                return (<li key={route.name}><NavLink className={setActiv} to={route.href}>{route.name}</NavLink></li>)

            })}
        </ul>
    )
}


